import { NgModule } from '@angular/core';
import { LayoutComponent } from '../components/main/layout/layout.component';
import { CouponDisplayComponent } from '../components/coupon-system/coupon-display/coupon-display.component';
import { CouponSingleComponent } from '../components/coupon-system/coupon-single/coupon-single.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/main/header/login-bar/login-bar.component';
import { HttpRequestInterceptorService } from '../services/http-request-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-design-imports-module.module';
import { NouisliderModule } from 'ng2-nouislider';
import { CouponDetailsComponent } from '../components/coupon-system/coupon-details/coupon-details.component';
import { ShoppingCartComponent } from '../components/coupon-system/shopping-cart/shopping-cart.component';
import { NotificationWindowComponent } from '../components/notifications/notification-window/notification-window.component';
import { NotificationQueryComponent } from '../components/notifications/notification-query/notification-query.component';
import { CheckOutPageComponent } from '../components/coupon-system/check-out-page/check-out-page.component';
import { CouponCreateComponent } from '../components/coupon-system/coupon-create/coupon-create.component';
import { NavigationComponent } from '../components/main/header/nav-bar/nav-bar.component';
import { CustomerViewAllComponent } from '../components/coupon-system/customer-view-all/customer-view-all.component';
import { CsTableComponent } from '../components/coupon-system/generic/cs-table/cs-table.component';
import { CustomerViewSingleComponent } from '../components/coupon-system/customer-view-single/customer-view-single.component';
import { CompanyViewAllComponent } from '../components/coupon-system/company-view-all/company-view-all.component';
import { CompanyViewSingleComponent } from '../components/coupon-system/company-view-single/company-view-single.component';
import { RegisterComponent } from '../components/register/register.component';
import { CompanyCreateComponent } from '../components/coupon-system/company-create/company-create.component';
import { AccountDetailsComponent } from '../components/account-details/account-details.component';
import { ImageDisplayComponent } from '../components/notifications/image-display/image-display.component';
import { FooterComponent } from '../components/main/footer/footer.component';

@NgModule({
  declarations: [
    LayoutComponent,
    CouponDisplayComponent,
    CouponSingleComponent,
    LoginComponent,
    HeaderComponent,
    CouponDetailsComponent,
    ShoppingCartComponent,
    NotificationWindowComponent,
    NotificationQueryComponent,
    CheckOutPageComponent,
    CouponCreateComponent,
    NavigationComponent,
    CustomerViewAllComponent,
    CsTableComponent,
    CustomerViewSingleComponent,
    CompanyViewAllComponent,
    CompanyViewSingleComponent,
    RegisterComponent,
    CompanyCreateComponent,
    AccountDetailsComponent,
    ImageDisplayComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptorService,
      multi: true
    }],
  bootstrap: [LayoutComponent],
  entryComponents: [ NotificationWindowComponent, NotificationQueryComponent, ImageDisplayComponent ]

})
export class AppModule { }
