import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from "rxjs/internal/operators";
import { Router } from '@angular/router';
import { LoginDetailsService } from './login/login-details.service';
import { ClientType } from '../models/enums/clientType';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})

export class HttpRequestInterceptorService implements HttpInterceptor {

  constructor(
    private loginDetailsService: LoginDetailsService,
    private notifcationService: NotificationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let id = this.loginDetailsService.getId();
    let params;
    if (id) {
      let param = "companyId";
      if (this.loginDetailsService.getClientType() == ClientType.CUSTOMER) {
        param = "customerId";
      }
      params = new HttpParams().append(param, id.toString());
    }

    request = request.clone({
      withCredentials: true,
      params: params
    })

    return next.handle(request).pipe(catchError((error, caught) => {
      if (error.status == 403) {
        this.loginDetailsService.clearDetails();
        this.router.navigate(["login"]);
        this.notifcationService.notify(error.error.internalErrorMessage);
      }
      throw error;
      return of(error);
    }) as any);
  }
}
