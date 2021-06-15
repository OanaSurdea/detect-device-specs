import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({ providedIn: 'root' })
export class ExcelService {
  constructor() {}

  public exportTableAsExcelFile(tableId: string, excelFileName?: string): void {
    let { sheetName, fileName } = this._getFileName(excelFileName);

    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: sheetName
    });

    XLSX.writeFile(wb, `${fileName}.xls`);
  }

  private _getFileName(userFileName: string): any {
    const d = new Date();
    const sheetName = userFileName || 'device-specs'; // user or default
    const fileName = `${sheetName}-${d.getDay()}-${d.getDate()}`;

    return {
      sheetName,
      fileName
    };
  }
}
