import { Component, OnInit, OnChanges } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CouponsService } from 'src/app/services/api/coupons.service';
import { Coupon } from 'src/app/models/coupon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out-page',
  templateUrl: './check-out-page.component.html',
  styleUrls: ['./check-out-page.component.scss']
})
export class CheckOutPageComponent implements OnInit {

  constructor(
    public shoppingCartService: ShoppingCartService,
    private couponService: CouponsService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.shoppingCartService.getCouponList().length == 0) {
      this.router.navigate(["home"]);
    }
  }


}
