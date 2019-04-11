import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/api/customer.service';
import { Customer } from 'src/app/models/customer';
import { TableStructure } from '../generic/cs-table/table-structure';
import { ParamService } from 'src/app/services/param.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-view-all',
  templateUrl: './customer-view-all.component.html',
  styleUrls: ['./customer-view-all.component.scss']
})
export class CustomerViewAllComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private paramnService: ParamService,
    private router: Router
  ) { }

  customers: Array<Customer> = [];
  selectedRow: any;

  tableStructure: TableStructure = new TableStructure();

  selectFunc = () => {
    this.paramnService.setParam("customer-data", this.selectedRow);
    this.router.navigate(["view-customer"]);
  }

  ngOnInit() {
    this.tableStructure
      .addRow("ID", "id")
      .addRow("Name", "name")
      .addRow("Email Address", "email")
      .addNumericFilter("ID Between", "id")
      .addStringFilter("Name Contains", "name")
      .addStringFilter("Email Contains", "email");

    this.customerService.getAllCustomers().subscribe(
      (response: Array<Customer>) => {
        this.customers = response;
      }
    )
  }

}
