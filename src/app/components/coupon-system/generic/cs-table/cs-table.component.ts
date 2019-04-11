import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableStructure } from './table-structure';


@Component({
  selector: 'app-cs-table',
  templateUrl: './cs-table.component.html',
  styleUrls: ['./cs-table.component.scss']
})

export class CsTableComponent implements OnInit {

  @Input() tableData: Array<any>;
  @Input() rowsData: TableStructure;
  @Input() isSelectable: boolean = false;
  @Output() selectedRowChange = new EventEmitter();

  @Input() selectFunction: Function;
  @Input() selectTextUnSelected: String = "Please select a row";
  @Input() selectTextSelected: String = "Selected"
  @Input() selectTextVar: String;
  @Input() selectedButtonText: String;
  @Input() public selectedRow;

  private activeFilter: any;
  private filterMinValue: number;
  private filterMaxValue: number;
  private filterStringSearch: string;

  selectRow(row: any) {
    if (this.isSelectable) {
      this.selectedRow = row;
      this.selectedRowChange.emit(this.selectedRow);
    }
  }

  selectActiveFilter(filter: any) {
    this.activeFilter = filter;
    this.filterMaxValue = undefined;
    this.filterMinValue = undefined;
    this.filterStringSearch = undefined;
  }

  private canShowRow(data) {
    if (this.activeFilter) {
      switch (this.activeFilter.type) {
        case "numeral":

          if (this.filterMinValue && data[this.activeFilter.varName] < this.filterMinValue) {
            return false;
          }

          if (this.filterMaxValue && data[this.activeFilter.varName] > this.filterMaxValue) {
            return false;
          }

          break;
        case "string":
          let dataString: string = data[this.activeFilter.varName]
          if (this.filterStringSearch && !dataString.toLowerCase().includes(this.filterStringSearch.toLowerCase())) {
            return false;
          }
        default:
          break;
      }
    }

    return true;
  }

  constructor() { }

  ngOnInit() {
  }
}
