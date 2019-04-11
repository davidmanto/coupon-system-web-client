import { Injectable } from '@angular/core';
import { ClientType } from 'src/app/models/enums/clientType';
import { LoginDetailsService } from './login-details.service';
import { PermissionType } from 'src/app/models/enums/permissionType';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { CouponSysConfig } from 'src/app/misc/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: String = CouponSysConfig.apiUrl;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService, 
    private loginDetailsService: LoginDetailsService,
    private router: Router
  ) {

    // this.loginDetailsService.loggedIn = false;
    this.checkLogin();
  }


  public checkLogin() {
    this.http.get(this.apiUrl + "loginCheck/", { /* withCredentials: true, */ responseType: "json" })
      .subscribe(
        (response) => {
          if (response["clientType"] != null) {
            this.loginDetailsService.updateDetails(response)
            if (this.router.url == "/login") {
              this.router.navigate(["home"])
            }
          }else{
            this.loginDetailsService.clearDetails();
          }
        },
        (error) => this.loginDetailsService.loggedIn = false
      )
  }


  public login(clientType: ClientType, name: String, password: String) {
    let body = {
      "name": name,
      "password": password,
      "clientType": clientType
    }

    this.http.post(this.apiUrl + "login/", body, {/*  withCredentials: true, */ responseType: "json" }).subscribe(
      (response) => {
        this.loginDetailsService.updateDetails(response);
        this.router.navigate(["home"])
      },
      (error) => {
        this.loginDetailsService.loggedIn = false;
        this.notificationService.notify(error.error.internalErrorMessage);
      }
    )
  }

  public logout() {
    this.http.get(this.apiUrl + "logout/", { withCredentials: true, responseType: 'text' }).subscribe(
      (response) => {
        this.loginDetailsService.clearDetails();
        this.router.navigate(["login"])
        this.notificationService.notify(response)
      },
      (error) => {
        this.loginDetailsService.loggedIn = false
      }
    )
  }

}
