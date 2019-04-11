import { Injectable } from '@angular/core';
import { CouponSysConfig } from '../../misc/config';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  apiUrl = CouponSysConfig.apiUrl + "customer/";

  public createCustomer(customer: Customer) {
    return this.http.post(this.apiUrl, customer);
  }

  public readCustomer(id: number) {
    return this.http.get(this.apiUrl + id);
  }

  public updateCustomer(customer: Customer) {
    return this.http.put(this.apiUrl, customer);
  }

  public deleteCustomer(id: number) {
    return this.http.delete(this.apiUrl + id)
  }

  public getAllCustomers() {
    return this.http.get(this.apiUrl + "all/");
  }
}
