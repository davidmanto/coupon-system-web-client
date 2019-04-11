import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponDisplayComponent } from '../components/coupon-system/coupon-display/coupon-display.component';
import { LoginComponent } from '../components/login/login.component';
import { AuthGuard } from '../services/auth/auth.guard';
import { CouponDetailsComponent } from '../components/coupon-system/coupon-details/coupon-details.component';
import { CheckOutPageComponent } from '../components/coupon-system/check-out-page/check-out-page.component';
import { CouponCreateComponent } from '../components/coupon-system/coupon-create/coupon-create.component';
import { CustomerViewAllComponent } from '../components/coupon-system/customer-view-all/customer-view-all.component';
import { CustomerViewSingleComponent } from '../components/coupon-system/customer-view-single/customer-view-single.component';
import { CompanyViewAllComponent } from '../components/coupon-system/company-view-all/company-view-all.component';
import { CompanyViewSingleComponent } from '../components/coupon-system/company-view-single/company-view-single.component';
import { ClientType } from '../models/enums/clientType';
import { RegisterComponent } from '../components/register/register.component';
import { CompanyCreateComponent } from '../components/coupon-system/company-create/company-create.component';
import { AccountDetailsComponent } from '../components/account-details/account-details.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },

  { path: "login", canActivate: [AuthGuard], component: LoginComponent },
  { path: "register", canActivate: [AuthGuard], component: RegisterComponent },

  { path: "account-details", canActivate: [AuthGuard], component: AccountDetailsComponent },

  { path: "home", canActivate: [AuthGuard], component: CouponDisplayComponent },

  { path: "my-coupons", canActivate: [AuthGuard], data: { "clientType": [ClientType.COMPANY, ClientType.CUSTOMER] }, component: CouponDisplayComponent },
  { path: "view-coupon/:id", canActivate: [AuthGuard], component: CouponDetailsComponent },
  { path: "view-coupon", canActivate: [AuthGuard], component: CouponDetailsComponent },
  { path: "create-coupon", canActivate: [AuthGuard], data: { "clientType": [ClientType.COMPANY] }, component: CouponCreateComponent },
  { path: "checkout", canActivate: [AuthGuard], data: { "clientType": [ClientType.CUSTOMER] }, component: CheckOutPageComponent },

  { path: "view-customers", data: { "clientType": [ClientType.ADMIN] }, canActivate: [AuthGuard], component: CustomerViewAllComponent },
  { path: "view-customer", data: { "clientType": [ClientType.ADMIN] }, canActivate: [AuthGuard], component: CustomerViewSingleComponent },
  { path: "view-customer/:id", data: { "clientType": [ClientType.ADMIN] }, canActivate: [AuthGuard], component: CustomerViewSingleComponent },

  { path: "create-company", data: { "clientType": [ClientType.ADMIN] }, canActivate: [AuthGuard], component: CompanyCreateComponent },
  { path: "view-companies", canActivate: [AuthGuard], data: { "clientType": [ClientType.ADMIN] }, component: CompanyViewAllComponent },
  { path: "view-company", data: { "clientType": [ClientType.ADMIN] }, canActivate: [AuthGuard], component: CompanyViewSingleComponent },
  { path: "view-company/:id", canActivate: [AuthGuard], data: { "clientType": [ClientType.ADMIN] }, component: CompanyViewSingleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
