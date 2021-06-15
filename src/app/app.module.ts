import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SpecificationsTableComponent } from './specifications-table/specifications-table.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule],
  declarations: [AppComponent, SpecificationsTableComponent, NavbarComponent],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
