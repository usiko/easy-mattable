import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TableCellModule } from './cell';
import { TableFilterModule } from './filters';
import { TableMaterialModule } from './material/table-material.module';
import { MapPipe } from './pipe';
import { TableCellService, TableFilterService, TableService } from './service';
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
    TableMaterialModule,
    TableFilterModule,
    TableCellModule
  ],
  exports: [
    TableComponent
  ],
  providers: [TableService, TableFilterService, TableCellService],
})
export class TableModule { }
