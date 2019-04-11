import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/api/company.service';
import { ParamService } from 'src/app/services/param.service';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { TableStructure } from '../generic/cs-table/table-structure';

@Component({
  selector: 'app-company-view-all',
  templateUrl: './company-view-all.component.html',
  styleUrls: ['./company-view-all.component.scss']
})
export class CompanyViewAllComponent implements OnInit {

  constructor(
    private companyService: CompanyService,
    private paramnService: ParamService,
    private router: Router
  ) { }

  companies: Array<Company> = [];
  selectedRow: any;

  tableStructure: TableStructure = new TableStructure();

  selectFunc = () => {
    this.paramnService.setParam("company-data", this.selectedRow);
    this.router.navigate(["view-company"]);
  }

  ngOnInit() {
    this.tableStructure
      .addRow("ID", "id")
      .addRow("Name", "name")
      .addRow("Email", "email")
      .addNumericFilter("ID Between ", "id")
      .addStringFilter("Name contains", "name")
      .addStringFilter("Email contains", "email")

    this.companyService.getAllCompanies().subscribe(
      (response: Array<Company>) => {
        this.companies = response;
      }
    )
  }

}
