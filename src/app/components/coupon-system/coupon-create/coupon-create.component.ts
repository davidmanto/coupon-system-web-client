import { Component, OnInit } from '@angular/core';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CouponType } from 'src/app/models/enums/couponType';
import { Coupon } from 'src/app/models/coupon';
import { CouponsService } from 'src/app/services/api/coupons.service';
import { ParamService } from 'src/app/services/param.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CouponSysConfig } from 'src/app/misc/config';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.scss']
})
export class CouponCreateComponent implements OnInit {

  constructor(
    private loginDetailsService: LoginDetailsService,
    private couponService: CouponsService,
    private paramService: ParamService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  minDate = new Date();
  categories = Object.keys(CouponType);
  couponImageList: Array<string> = [];

  creationForm = new FormGroup({
    title: new FormControl("",
      Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(30)])
    ),
    endDate: new FormControl("",
      Validators.compose([Validators.required])
    ),
    amount: new FormControl("",
      Validators.compose([Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
    )
    ,
    price: new FormControl("",
      Validators.compose([Validators.required, Validators.pattern('^[1-9]+[0-9]*[.]?[1-9]+[0-9]*$')])
    )
    ,
    type: new FormControl("",
      Validators.compose([Validators.required])
    )
    ,
    message: new FormControl("",
      Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(255)])
    )
    ,
    img: new FormControl("",
      Validators.compose([Validators.required])
    )
  })

  submitEnabled(): boolean {
    return this.creationForm.dirty && this.creationForm.valid;
  }

  submit() {
    let createdCoupon = new Coupon();
    createdCoupon.companyId = this.loginDetailsService.getId();
    createdCoupon.title = this.creationForm.controls.title.value;
    createdCoupon.message = this.creationForm.controls.message.value;
    createdCoupon.type = this.creationForm.controls.type.value;
    createdCoupon.price = this.creationForm.controls.price.value;
    createdCoupon.amount = this.creationForm.controls.amount.value;
    createdCoupon.endDate = this.creationForm.controls.endDate.value.getTime();
    createdCoupon.image = this.creationForm.controls.img.value;

    this.couponService.createCoupon(createdCoupon).subscribe(
      (response: number) => {
        createdCoupon.id = response;
        createdCoupon.startDate = new Date().getTime();
        // this.paramService.setParam("coupon", createdCoupon);
        this.router.navigate(["view-coupon", createdCoupon.id]);
      },
      (error) => {
        this.notificationService.notify(error.error.internalErrorMessage);
      }
    )
  }

  previewImage(){
    this.notificationService.showBigImage(this.creationForm.controls.img.value);
  }

  ngOnInit() {
    this.couponService.getCouponImages().subscribe((response: Array<string>) => {
      this.couponImageList = response;
    })
  }

  hintColorClass(field) {
    if (field.touched) {
      if (field.valid) {
        return "ok";
      } else {
        return "error";
      }
    }
    return "";
  }

}
