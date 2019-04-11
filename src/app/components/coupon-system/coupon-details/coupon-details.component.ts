import { Component, OnInit } from '@angular/core';
import { ParamService } from 'src/app/services/param.service';
import { Coupon } from 'src/app/models/coupon';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionType } from 'src/app/models/enums/permissionType';
import { ClientType } from 'src/app/models/enums/clientType';
import { NotificationQuery } from '../../notifications/notification-query/NotificationQuery';
import { NotificationService } from 'src/app/services/notification.service';
import { CouponsService } from 'src/app/services/api/coupons.service';

@Component({
  selector: 'app-coupon-details',
  templateUrl: './coupon-details.component.html',
  styleUrls: ['./coupon-details.component.scss']
})
export class CouponDetailsComponent implements OnInit {

  coupon: Coupon = new Coupon();
  refFromPurchasedCoupons: boolean = false;
  backButtonText: string = "Return to catalogue";
  showEnlargeText: boolean = false;

  constructor(
    private paramService: ParamService,
    private router: Router,
    private route: ActivatedRoute,
    private loginDetailsService: LoginDetailsService,
    private notificationService: NotificationService,
    private couponService: CouponsService,

  ) { }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.couponService.readCoupon(this.route.snapshot.params.id).subscribe((response: Coupon) => {
        this.coupon = response
      },
        (error) => {
          this.notificationService.notify(error.error.internalErrorMessage);
        })
      return;
    }

    let paramData = this.paramService.getParamData();

    this.refFromPurchasedCoupons = paramData["refFromPurchased"];
    if (this.refFromPurchasedCoupons) {
      this.backButtonText = "Return to purchased coupons";
    }

    let couponParam = paramData["coupon"];
    if (couponParam) {
      this.coupon = couponParam;
    }

  }

  showBigImage() {
    this.notificationService.showBigImage(this.coupon.image);
  }

  canPurchase() {
    if (this.refFromPurchasedCoupons) {
      return false;
    }
    else if (!this.loginDetailsService.hasPermission(PermissionType.COUPON_PURCHASE)) {
      return false;
    }

    return true;
  }

  goHome() {
    let route = ["home"];
    if (this.refFromPurchasedCoupons) {
      route = ["my-coupons"];
    }

    this.router.navigate(route)
  }

  couponBelongsToCompany(): boolean {
    if (this.loginDetailsService.getClientType() != ClientType.COMPANY) {
      return false;
    }

    if (this.coupon.companyId != this.loginDetailsService.getId()) {
      return false;
    }

    return true;
  }

  deleteCoupon() {
    this.couponService.deleteCoupon(this.coupon.id).subscribe(
      (response) => {
        let route = "my-coupons";
        if (this.loginDetailsService.getClientType() != ClientType.COMPANY) {
          route = "home";
        }
        this.router.navigate([route]).then(() => {
          this.notificationService.notify("Coupon removed");
        })
      },
      (error) => this.notificationService.notify(error.error.internalErrorMessage)
    )
  }

  updateCoupon() {
    let query = new NotificationQuery("Update coupon details");
    query.addQuery("endDate", "Enter new expiry date", { type: "date", oldValue: this.coupon.endDate, minDate: new Date(), maxDate: new Date(2020, 0, 1) })
    query.addQuery("price", "Enter new price", { type: "number", oldValue: this.coupon.price });

    this.notificationService.query(query).subscribe(
      (result) => {
        if (result) {
          result.getResultData().endDate = result.getResultData().endDate.getTime ? result.getResultData().endDate.getTime() : result.getResultData().endDate;

          let updatedCoupon = new Coupon(this.coupon);
          Object.assign(updatedCoupon, result.getResultData())
          this.couponService.updateCoupon(updatedCoupon).subscribe(
            (response) => {
              Object.assign(this.coupon, updatedCoupon);
              this.notificationService.notify("Details Updated");
            }, (error) => {
              this.notificationService.notify(error.error.internalErrorMessage)
            })
        }
      }
    )
  }
}
