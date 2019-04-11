import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/api/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamService } from 'src/app/services/param.service';
import { Company } from 'src/app/models/company';
import { Customer } from 'src/app/models/customer';
import { NotificationQuery } from '../notifications/notification-query/NotificationQuery';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { ClientType } from 'src/app/models/enums/clientType';
import { CustomerService } from 'src/app/services/api/customer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private loginDetailsService: LoginDetailsService,
    private router: Router,
    private route: ActivatedRoute,
    private paramService: ParamService,
  ) { }

  clientData: Company | Customer;

  ngOnInit() {
    if (this.loginDetailsService.getClientType() == ClientType.COMPANY) {
      this.clientData = new Company();
    } else {
      this.clientData = new Customer();
    }

    this.clientData.name = this.loginDetailsService.getName();
    this.clientData.id = this.loginDetailsService.getId();
    this.clientData.email = this.loginDetailsService.getEmail();
  }

  updateDetails() {
    let query = new NotificationQuery("Update details");
    query.addQuery("email", "Enter new email address", { type: "email", oldValue: this.loginDetailsService.getEmail() })
    query.addQuery("password", "Enter new passowrd", { type: "password", oldValue: "" });
    query.addQuery("repeatPassword", "Repeat passowrd", { type: "password" });

    this.notificationService.query(query).subscribe(
      (result) => {
        if (result) {
          let password = result.getResultData().password;
          let repeatPassword = result.getResultData().repeatPassword;
          if (repeatPassword && password && repeatPassword != password) {
            this.notificationService.notify("Passwords do not match")
            return;
          }
          let updateMethod: Observable<any>;
          let tempClientData: any = { ...this.clientData };

          tempClientData.passowrd = "";
          tempClientData.email = "";

          Object.assign(tempClientData, result.getResultData())
          if (this.loginDetailsService.getClientType() == ClientType.COMPANY) {
            tempClientData = new Company(tempClientData);
            updateMethod = this.companyService.updateCompany(tempClientData);
          } else {
            tempClientData = new Customer(tempClientData);
            updateMethod = this.customerService.updateCustomer(tempClientData);
          }

          updateMethod.subscribe(
            (response) => {
              Object.assign(this.clientData, tempClientData)
              tempClientData.clientType = this.loginDetailsService.getClientType();
              this.loginDetailsService.updateDetails(tempClientData);
              this.notificationService.notify("Details updated");
            },
            (error) => {
              this.notificationService.notify(error.error.internalErrorMessage);
            }
          )
        }
      }
    )
  }

  goHome() {
    this.router.navigate(["home"]);
  }

}
