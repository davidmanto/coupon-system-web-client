import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/api/customer.service';
import { NotificationQuery } from '../../notifications/notification-query/NotificationQuery';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamService } from 'src/app/services/param.service';

@Component({
  selector: 'app-customer-view-single',
  templateUrl: './customer-view-single.component.html',
  styleUrls: ['./customer-view-single.component.scss']
})
export class CustomerViewSingleComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private paramService: ParamService,
  ) { }

  customerData: Customer;
  noDataText = "Loading...";

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.customerService.readCustomer(this.route.snapshot.params.id).subscribe(
        (response: Customer) => {
          this.customerData = response;
        },
        (error) => {
          this.notificationService.notify(error.error.internalErrorMessage);
          this.noDataText = "Customer not found!";
        }
      )
    } else if (this.paramService.getParamData()["customer-data"]) {
      this.customerData = this.paramService.getParamData()["customer-data"];
    } else {
      this.noDataText = "Customer not found!";
    }
  }

  updateDetails() {
    let query = new NotificationQuery("Update customer details");
    query.addQuery("email", "Enter new email address", { type: "email", oldValue: this.customerData.email });
    query.addQuery("password", "Enter new password", { type: "password" });

    this.notificationService.query(query).subscribe(
      (result) => {
        if (result) {
          let customer = new Customer(this.customerData);
          Object.assign(customer, result.getResultData());
          this.customerService.updateCustomer(customer).subscribe(
            (response) => {
              Object.assign(this.customerData, customer);
              this.notificationService.notify("Details updated!");
            },
            (error) => {
              this.notificationService.notify(error.error.internalErrorMessage);
            }
          )
        }
      }
    )
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.customerData.id).subscribe(
      (response) => {
        this.notificationService.notify("Customer removed");
        this.router.navigate(["view-customers"]);
      },
      (error) => this.notificationService.notify(error.error.internalErrorMessage)
    )
  }

  goBack() {
    this.router.navigate(["view-customers"]);
  }
}
