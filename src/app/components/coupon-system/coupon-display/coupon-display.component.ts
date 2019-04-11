import { Component, OnInit } from '@angular/core';
import { CouponType } from 'src/app/models/enums/couponType';
import { CouponsService } from 'src/app/services/api/coupons.service';
import { Coupon } from 'src/app/models/coupon';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Router } from '@angular/router';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { ClientType } from 'src/app/models/enums/clientType';
import { ParamService } from 'src/app/services/param.service';

@Component({
  selector: 'app-coupon-display',
  templateUrl: './coupon-display.component.html',
  styleUrls: ['./coupon-display.component.scss']
})
export class CouponDisplayComponent implements OnInit {
  constructor(
    private couponService: CouponsService,
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private loginDetailsService: LoginDetailsService,
    private paramService: ParamService,
  ) { }

  categories = Object.keys(CouponType);
  selectedCategory: string = "";
  couponData: Array<any>;
  minPrice: number;
  maxPrice: number;
  priceRange = [0, 0];
  showInCart: boolean = false;
  showOutOfStock: boolean = false;
  couponSearchByName: string = "";
  showingPurchasedCoupons: boolean = false;

  canShowCoupon(coupon: Coupon) {
    if (this.selectedCategory && this.selectedCategory != coupon.type) {
      return false;
    }

    else if (coupon.price > this.priceRange[1] || coupon.price < this.priceRange[0]) {
      return false;
    }

    else if (!this.showInCart && this.shoppingCartService.hasCoupon(coupon.id)) {
      return false;
    }

    else if (!this.showingPurchasedCoupons && !this.showOutOfStock && coupon.amount < 1) {
      return false;
    }

    else if (this.couponSearchByName && !coupon.title.toLowerCase().includes(this.couponSearchByName.toLowerCase())) {
      return false;
    }

    return true;
  }

  loadCoupons(data) {
    this.couponData = Object.keys(data).map((key) => {
      if (!this.maxPrice || data[key].price > this.maxPrice) {
        this.maxPrice = data[key].price;
      }

      if (!this.minPrice || data[key].price < this.minPrice) {
        this.minPrice = data[key].price;
      }

      return new Coupon(data[key])
    });

    this.minPrice = this.minPrice == this.maxPrice ? 0 : this.minPrice;

    this.priceRange = [this.minPrice, this.maxPrice];
  }

  ngOnInit() {
    let method = this.couponService.getAllCoupons();
    this.paramService.setParam("refFromPurchased", false);

    let myCoupons = this.router.url == "/my-coupons";

    switch (this.loginDetailsService.getClientType()) {
      case ClientType.CUSTOMER:
        if (myCoupons) {
          this.paramService.setParam("refFromPurchased", true);
          this.showingPurchasedCoupons = true;
          method = this.couponService.getByCustomer();
        } else {
          method = this.couponService.getUnPurchasedCoupons();
        }
        break;
      case ClientType.COMPANY:
        this.showingPurchasedCoupons = true;
        if (myCoupons) {
          method = this.couponService.getByCompany(this.loginDetailsService.getId());
        }
        break;
      default:
        break;
    }


    method.subscribe(
      (response) => {
        this.loadCoupons(response)
      }
    )

  }

}
