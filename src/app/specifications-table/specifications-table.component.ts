import { Component, OnInit } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import * as Bowser from 'bowser';
import { Specification } from '../shared/interfaces/specification.interface';

@Component({
  selector: 'app-specifications-table',
  templateUrl: './specifications-table.component.html',
  styleUrls: ['./specifications-table.component.scss']
})
export class SpecificationsTableComponent implements OnInit {
  userAgent = Bowser.parse(window.navigator.userAgent);

  browser = Bowser.getParser(window.navigator.userAgent);
  browserName: string;
  browserLogo: string;

  deviceResolution: string = 'N/A';
  deviceHeight: number;
  deviceWidth: number;
  devicePixelRatio: number = 1;

  userAgentDetails = JSON.stringify(this.userAgent, null, 4);
  browserDetails = JSON.stringify(this.browser.getBrowser(), null, 4);

  deviceSpecifications: Specification[] = [];

  constructor() {}

  ngOnInit(): void {
    this._getBrowser();
    this._initPlatformInfo();
    this._initBrowserInfo();
    this._initOsInfo();

    this._initDevicePixelRatio();
    this._initDeviceResolution();

    this._initEngineInfo();
    this._initUserAgentInfo();
  }
  private _getBrowser(): void {
    const browsers = [
      ['firefox', 'Firefox'],
      ['opera', 'Opera'],
      ['ie', 'Trident'],
      ['edge', 'Edg'],
      ['brave', 'Brave'],
      ['chrome', 'Chrome'],
      ['safari', 'Safari']
    ];

    for (const [browser, agent] of browsers) {
      if ((navigator as any).brave) {
        this.browserName = 'brave';
      }
      if (navigator.userAgent.includes(agent)) {
        this.browserName = browser;
        return;
      }
    }
  }

  private _addTableRow(rowInfo: Specification) {
    if (rowInfo) {
      this.deviceSpecifications.push(rowInfo);
    }
  }

  private _initBrowserInfo(): void {
    this._addTableRow({
      property: 'Browser',
      value: this.browser.getBrowserName(),
      version: this.browser.getBrowserVersion()
    });
  }

  private _initOsInfo(): void {
    this._addTableRow({
      property: 'OS',
      value: this.browser.getOSName(),
      version: this.browser.getOSVersion()
    });
  }

  private _initPlatformInfo(): void {
    this._addTableRow({
      property: 'Platform',
      value: new TitleCasePipe().transform(this.browser.getPlatformType()),
      version: '-'
    });
  }

  private _initDevicePixelRatio(): void {
    this.devicePixelRatio = window.devicePixelRatio;

    this._addTableRow({
      property: 'Device Pixel Ratio',
      value: window.devicePixelRatio,
      version: '-'
    });
  }

  private _initDeviceResolution(): void {
    this.deviceHeight = window.screen.height * this.devicePixelRatio;
    this.deviceWidth = window.screen.width * this.devicePixelRatio;
    this.deviceResolution = `${this.deviceHeight} x ${this.deviceWidth}`;

    this._addTableRow({
      property: 'Resolution h x w',
      value: this.deviceResolution,
      version: '-'
    });
  }

  private _initEngineInfo(): void {
    this._addTableRow({
      property: 'Engine',
      value: this.browser.getEngineName(),
      version: '-'
    });
  }

  private _initUserAgentInfo(): void {
    this._addTableRow({
      property: 'User Agent',
      value: this.browser.getUA(),
      version: '-'
    });
  }
}
