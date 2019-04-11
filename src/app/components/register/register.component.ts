import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { ClientType } from 'src/app/models/enums/clientType';
import { matchOtherValidator } from 'src/app/misc/match-other-validator';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/api/customer.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CouponSysConfig } from 'src/app/misc/config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private customerService: CustomerService,
    private notificationService: NotificationService
    // private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  ClientType = ClientType;

  registerForm = new FormGroup({
    // type: new FormControl("CUSTOMER",
    //   Validators.compose([Validators.required])
    // ),
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
  });

  isSubmitEnabled() {
    return this.registerForm.valid && this.registerForm.dirty;
    // return true;
  }

  goToLoginPage() {
    this.router.navigate(["login"]);
  }

  onSubmit() {
    let customer = new Customer();
    customer.name = this.registerForm.controls.name.value;
    customer.password = this.registerForm.controls.password.value;
    customer.email = this.registerForm.controls.email.value;

    this.customerService.createCustomer(customer).subscribe(
      (response) => {
        this.notificationService.notify("Register successfull, you may now log in");
        this.router.navigate(["login"]);
      },
      (error) => {
        this.notificationService.notify(error.error.internalErrorMessage);
      }

    );
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
