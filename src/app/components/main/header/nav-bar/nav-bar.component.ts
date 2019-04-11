import { Component, OnInit } from '@angular/core';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { ClientType } from 'src/app/models/enums/clientType';
import { Router } from '@angular/router';
import { NotificationQuery } from 'src/app/components/notifications/notification-query/NotificationQuery';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavigationComponent implements OnInit {

  navButtons: Array<any> = [];

  constructor(
    private loginDetailsService: LoginDetailsService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.addButton("Store", { route: ["home"] })

    this.addButton("View Customers", { route: ["view-customers"] }, ClientType.ADMIN);
    this.addButton("View Customer by ID", {
      func: () => {
        let query = new NotificationQuery("View customer by ID:");
        query.addQuery("id", "Enter requested customer ID:")

        this.notificationService.query(query).subscribe(
          (result) => {
            if (result && result.getResultData().id) {
              this.router.navigate([""]).then(() => {
                this.router.navigate(["view-customer", result.getResultData().id])
              })
            }
          }
        )
      }
    }, ClientType.ADMIN);
    this.addButton("Create Company", { route: ["create-company"] }, ClientType.ADMIN);
    this.addButton("View Companies", { route: ["view-companies"] }, ClientType.ADMIN);
    this.addButton("View Company by ID", {
      func: () => {
        let query = new NotificationQuery("View company by ID:");
        query.addQuery("id", "Enter requested company ID:")

        this.notificationService.query(query).subscribe(
          (result) => {
            if (result && result.getResultData().id) {
              this.router.navigate([""]).then(() => {
                this.router.navigate(["view-company", result.getResultData().id])
              })
            }
          }
        )
      }
    }, ClientType.ADMIN );

    this.addButton("My Coupons", { route: ["my-coupons"] }, ClientType.CUSTOMER)

    this.addButton("Company Coupons", { route: ["my-coupons"] }, ClientType.COMPANY)
    this.addButton("Create Coupon", { route: ["create-coupon"] }, ClientType.COMPANY)
    this.addButton("View Coupon by ID", {
      func: () => {
        let query = new NotificationQuery("View coupon by ID:");
        query.addQuery("id", "Enter requested coupon ID:")

        this.notificationService.query(query).subscribe(
          (result) => {
            if (result && result.getResultData().id) {
              this.router.navigate([""]).then(() => {
                this.router.navigate(["view-coupon", result.getResultData().id])
              })
            }
          }
        )
      }
    }, ClientType.COMPANY)
  }


  addButton(name: string, options: { route?: string[], func?: Function }, clientType?: ClientType) {
    if (clientType && this.loginDetailsService.getClientType() != clientType) {
      return;
    }
    this.navButtons.push(
      {
        "name": name,
        "route": options.route && options.route,
        "func": options.func && options.func
      }
    )
  }

  navigate(buttonData) {
    if (buttonData.route) {
      this.router.navigate(buttonData.route);
    } else {
      buttonData.func();
    }
  }

}
