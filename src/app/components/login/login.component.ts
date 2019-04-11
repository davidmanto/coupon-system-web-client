import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ClientType } from 'src/app/models/enums/clientType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    // private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  clientTypeKeys = Object.keys(ClientType);
  ClientType = ClientType;

  loginForm = new FormGroup({
    name: new FormControl("", Validators.required),
    type: new FormControl("CUSTOMER"),
    password: new FormControl("", Validators.required)
  });

  isSubmitEnabled() {
    //return this.loginForm.valid && this.loginForm.dirty;
    return true;
  }

  onSubmit() {
    this.loginService.login(this.loginForm.value.type, this.loginForm.value.name, this.loginForm.value.password);
  }

  goToRegisterPage() {
    this.router.navigate(["register"]);
  }

}
