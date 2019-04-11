import { Injectable } from '@angular/core';
import { ClientType } from 'src/app/models/enums/clientType';
import { PermissionType } from 'src/app/models/enums/permissionType';

@Injectable({
  providedIn: 'root'
})
export class LoginDetailsService {
  public loggedIn: boolean = false;
  private name: string;
  private id: number;
  private email: string;
  private clientType: ClientType;
  private permissions: Array<any> = [];

  public getName() {
    return this.name;
  }

  public getId() {
    return this.id;
  }

  public getEmail(){
    return this.email;
  }

  public getClientType() {
    return this.clientType;
  }

  public getPermissions() {
    return this.permissions;
  }

  public isLoggedIn() {
    return this.loggedIn;
  }

  public canAccess(permission: PermissionType): boolean {
    if (permission == null) {
      return true;
    }
    return this.hasPermission(permission);
  }

  public hasPermission(permission: PermissionType) {
    return this.permissions.includes(permission);
  }

  clearDetails(){
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("clientType");
    sessionStorage.removeItem("permissions");
    sessionStorage.removeItem("email");

    this.loggedIn = false;
    this.clientType = undefined;
    this.id = undefined;
    this.name = undefined;
    this.email = undefined;
  }

  updateDetails(details) {
    this.loggedIn = true;
    
    let clientType: string = details.clientType
    clientType = clientType.toUpperCase();

    sessionStorage.setItem("name", details.name);
    sessionStorage.setItem("email", details.email);
    sessionStorage.setItem("id", String(details.id));
    sessionStorage.setItem("clientType", clientType);

    this.name = details.name;
    this.id = details.id;
    this.email = details.email;
    this.clientType = ClientType[clientType];

    if (details.permissions) {
      this.permissions = [];
      details.permissions.forEach(element => {
        this.permissions.push(PermissionType[element]);
      });
    }
    sessionStorage.setItem("permissions", JSON.stringify(this.permissions))
  }
  constructor(

  ) {
    let clientType = sessionStorage.getItem("clientType");
    if (clientType && clientType != "") {
      this.loggedIn = true;
      this.clientType = ClientType[clientType];
      this.name = sessionStorage.getItem("name");
      this.email = sessionStorage.getItem("email");
      this.id = Number(sessionStorage.getItem("id"));

      let permissions = sessionStorage.getItem("permission");
      if (permissions && permissions != "") {
        this.permissions == JSON.parse(permissions);
      }
    }
  }
}
