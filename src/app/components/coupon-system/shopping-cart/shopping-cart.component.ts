import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Coupon } from 'src/app/models/coupon';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { PermissionType } from 'src/app/models/enums/permissionType';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private loginDetailsService: LoginDetailsService,
  ) { }
  
  ngOnInit() {
  }

  canSeeCart(){
    return this.loginDetailsService.hasPermission(PermissionType.COUPON_PURCHASE);
  }

}