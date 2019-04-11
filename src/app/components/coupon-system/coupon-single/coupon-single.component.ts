import { Component, OnInit, Input } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { ParamService } from 'src/app/services/param.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { ClientType } from 'src/app/models/enums/clientType';

@Component({
  selector: 'app-coupon-single',
  templateUrl: './coupon-single.component.html',
  styleUrls: ['./coupon-single.component.scss']
})
export class CouponSingleComponent implements OnInit {

  @Input() coupon: Coupon;  
  constructor(
    private paramService: ParamService,
    private router: Router,
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit() {
  }

  viewDetails() {
    this.paramService.setParam("coupon", this.coupon);
    this.router.navigate(["view-coupon"])
  }
}
