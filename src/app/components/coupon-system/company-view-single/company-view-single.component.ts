import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/api/company.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamService } from 'src/app/services/param.service';
import { Company } from 'src/app/models/company';
import { NotificationQuery } from '../../notifications/notification-query/NotificationQuery';

@Component({
  selector: 'app-company-view-single',
  templateUrl: './company-view-single.component.html',
  styleUrls: ['./company-view-single.component.scss']
})
export class CompanyViewSingleComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private paramService: ParamService,
  ) { }

  companyData: Company;
  noDataText = "Loading...";

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.companyService.readCompany(this.route.snapshot.params.id).subscribe(
        (response: Company) => {
          this.companyData = response;
        },
        (error) => {
          this.notificationService.notify(error.error.internalErrorMessage)
          this.noDataText = "Company not found!"
        }
      )
    } else if (this.paramService.getParamData()["company-data"]) {
      this.companyData = this.paramService.getParamData()["company-data"];
    } else {
      this.noDataText = "Company not found!";
    }
  }

  updateDetails() {
    let query = new NotificationQuery("Update company details");
    query.addQuery("email", "Enter new email address", { type: "email", oldValue: this.companyData.email })
    query.addQuery("password", "Enter new passowrd", { type: "password", oldValue: this.companyData.password });

    this.notificationService.query(query).subscribe(
      (result) => {
        if (result) {
          let company = new Company(this.companyData);
          Object.assign(company, result.getResultData())
          this.companyService.updateCompany(company).subscribe(
            (response) => {
              Object.assign(this.companyData, company)
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

  deleteCompany() {
    this.companyService.deleteCompany(this.companyData.id).subscribe(
      (response) => {
        this.notificationService.notify("Company removed");
        this.router.navigate(["view-companies"]);
      },
      (error) => this.notificationService.notify(error.error.internalErrorMessage)
    )
  }

  goBack() {
    this.router.navigate(["view-companies"]);
  }

}
