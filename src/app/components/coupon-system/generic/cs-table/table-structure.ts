export class TableStructure {
  rows: Array<Object> = new Array();
  filters: Array<Object> = new Array();

  private addFilter(name: string, varName: string, type: string) {
    this.filters.push(
      {
        "name": name,
        "varName": varName,
        "type": type
      }
    )
  }

  addNumericFilter(name: string, varName: string) {
    this.addFilter(name, varName, "numeral");

    return this;
  }

  addStringFilter(name: string, varName: string) {
    this.addFilter(name, varName, "string");

    return this;
  }

  addRow(rowName: string, rowData: string, func?: Function) {
    this.rows.push(
      {
        "title": rowName,
        "varName": rowData,
        "func": func || null
      }
    )

    return this;
  }
}