import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { LoginDetailsService } from '../login/login-details.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private loginDetailsService: LoginDetailsService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  loggedOutUrls = {
    "/login": true,
    "/register": true
  }

  canAccessUrl(url: string, data: any): boolean {

    if (this.loggedOutUrls[url]) {
      if (this.loginDetailsService.isLoggedIn()) {
        this.router.navigate(["home"]);
        return false;
      }
    } else {
      if (!this.loginDetailsService.isLoggedIn()) {
        this.router.navigate(["login"]);
        return false;

      }
    }

    if (data.clientType && data.clientType instanceof Array) {
      let authorisedClientType: boolean = false;

      for (const clientType of data.clientType) {
        if (this.loginDetailsService.getClientType() == clientType) {
          authorisedClientType = true;
          break;
        }
      }

      if (!authorisedClientType) {
        return false;
      }
    }


    return true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canAccessUrl(state.url, next.data);
  }

  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //   return false;
  // }
}
