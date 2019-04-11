import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CouponSysConfig } from '../../misc/config';
import { Coupon } from '../../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient,
  ) { }

  apiUrl = CouponSysConfig.apiUrl + "coupon/";

  public createCoupon(coupon: Coupon) {
    return this.http.post(this.apiUrl, coupon);
  }

  public readCoupon(id: number) {
    return this.http.get(this.apiUrl + id);
  }

  public updateCoupon(coupon: Coupon) {
    return this.http.put(this.apiUrl, coupon);
  }

  public deleteCoupon(id: number) {
    return this.http.delete(this.apiUrl + id);
  }

  public getAllCoupons() {
    return this.http.get(this.apiUrl + "all/");
  }

  public getByCompany(companyId: number) {
    return this.http.get(this.apiUrl + "getByCompany/", { params: new HttpParams().append("companyId", companyId.toString()) })
  }

  public getByCustomer() {
    return this.http.get(this.apiUrl + "getByCustomer/");
  }

  public getUnPurchasedCoupons() {
    return this.http.get(this.apiUrl + "getUnpurchased/");
  }

  public purchaseCoupons(couponIds: Array<number>) {
    return this.http.post(this.apiUrl + "purchase/multiple/", couponIds);
  }

  public getCouponImages() {
    return this.http.get(this.apiUrl + "getImages");
  }
}
