import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { CouponsService } from './api/coupons.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(
    private notificationService: NotificationService,
    private couponService: CouponsService,
    private router: Router,
  ) {
    let cartStorage = sessionStorage.getItem("coupon-cart");
    if (cartStorage && cartStorage != "") {
      this.couponList = JSON.parse(cartStorage);
      for (let coupon of this.couponList) {
        this.totalPrice += coupon.price;
        this.ownedCouponsMap[coupon.id] = true;
      }
    }
  }

  private couponList: Array<Coupon> = [];
  private totalPrice: number = 0;
  private ownedCouponsMap = {};

  updateStorageItem() {
    sessionStorage.setItem("coupon-cart", JSON.stringify(this.couponList));
  }

  empty() {
    this.couponList = [];
    this.ownedCouponsMap = {};
    this.totalPrice = 0;
    sessionStorage.removeItem("coupon-cart");
  }

  removeFromCart(index: number) {
    this.totalPrice -= this.couponList[index].price;
    delete this.ownedCouponsMap[this.couponList[index].id];
    this.couponList.splice(index, 1);
    this.updateStorageItem();

    if (this.router.url == "/checkout") {
      this.router.navigate(["home"]);
      this.notificationService.notify("Cart is empty");
    }
  }

  addToCart(coupon: Coupon) {
    if (this.hasCoupon(coupon.id)) {
      this.notificationService.notify("Coupon already in cart!");
      return;
    }
    this.couponList.push(coupon);
    this.totalPrice += coupon.price;
    this.ownedCouponsMap[coupon.id] = true;
    this.updateStorageItem();
  }

  hasCoupon(id: number) {
    return this.ownedCouponsMap[id] || false;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  getCouponList() {
    return this.couponList;
  }

  goToCheckout() {
    if (this.couponList.length == 0) {
      this.notificationService.notify("No coupons in cart!");
      return;
    }

    this.router.navigate(["checkout"]);
  }

  commitCheckout() {
    let couponIds: Array<number> = [];

    for (let coupon of this.couponList) {
      couponIds.push(coupon.id);
    }

    this.couponService.purchaseCoupons(couponIds).subscribe(
      (response) => { this.notificationService.notify("Coupons purchased successfully") },
      (error) => { this.notificationService.notify(error.error.internalErrorMessage) }
    ).add(() => { this.empty(); this.router.navigate(["home"]) })
  }

}
