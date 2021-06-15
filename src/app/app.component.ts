import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClipboardService } from './shared/services/clipboard.service';
import { ExcelService } from './shared/services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private clipboardService: ClipboardService,
    private excelService: ExcelService
  ) {}

  public ngOnInit(): void {}

  public copyToClipboard(): void {
    this.clipboardService.copy('deviceSpecificationsTable');
  }

  public download(): void {
    this.excelService.exportTableAsExcelFile('deviceSpecificationsTable');
  }
}
