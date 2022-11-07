import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TableMaterialModule } from './material/table-material.module';
import { MapPipe } from './pipe/map.pipe';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent,
    MapPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TableMaterialModule
  ],
  exports: [
    TableComponent
  ],
  providers: [],
})
export class TableModule { }
