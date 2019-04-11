import { Component, OnInit } from '@angular/core';
import { LoginDetailsService } from 'src/app/services/login/login-details.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { ClientType } from 'src/app/models/enums/clientType';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public loginDetailsService: LoginDetailsService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  canChangeAccountSettings(): boolean {
    return this.loginDetailsService.getClientType() != ClientType.ADMIN;
  }

  goToAccountDetailsPage() {
    this.router.navigate(["account-details"]);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(["login"]);
  }
}
