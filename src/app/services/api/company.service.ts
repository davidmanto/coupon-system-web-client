import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../../models/company';
import { CouponSysConfig } from '../../misc/config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  apiUrl = CouponSysConfig.apiUrl + "company/";

  public createCompany(company: Company) {
    return this.http.post(this.apiUrl, company);
  }

  public readCompany(id: number) {
    return this.http.get(this.apiUrl + id)
  }

  public updateCompany(company: Company) {
    return this.http.put(this.apiUrl, company);
  }
  
  public deleteCompany(id: number) {
    return this.http.delete(this.apiUrl + id)
  }

  public getAllCompanies() {
    return this.http.get(this.apiUrl + "all/");
  }

}
