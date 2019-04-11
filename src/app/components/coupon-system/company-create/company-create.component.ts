import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/api/company.service';
import { ParamService } from 'src/app/services/param.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CouponSysConfig } from 'src/app/misc/config';
import { matchOtherValidator } from 'src/app/misc/match-other-validator';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private paramService: ParamService,
    private router: Router,
    private notificationService: NotificationService
  ) { }


  creationForm = new FormGroup({
    name: new FormControl("",
      Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(18)])
    ),
    email: new FormControl("",
      Validators.compose([Validators.required, Validators.pattern(CouponSysConfig.emailRegex)])
    ),
    password: new FormControl("",
      Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    ),
    repeatPassword: new FormControl("",
      Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16), matchOtherValidator("password")])
    )
  })

  submitEnabled(): boolean {
    return this.creationForm.dirty && this.creationForm.valid;
  }

  submit() {
    let createdCompany = new Company();
    createdCompany.name = this.creationForm.controls.name.value;
    createdCompany.password = this.creationForm.controls.password.value;
    createdCompany.email = this.creationForm.controls.email.value;

    this.companyService.createCompany(createdCompany).subscribe(
      (response: number) => {
        createdCompany.id = response;
        this.paramService.setParam("company-data", createdCompany);
        this.router.navigate(["view-company"]);
      },
      (error) => {
        this.notificationService.notify(error.error.internalErrorMessage);
      }
    )
  }

  ngOnInit() {
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
