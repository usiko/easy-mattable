import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TableCellService } from '../service/table-cell.service';
import { TableFilterService } from '../service/table-filter.service';
import { TableService } from '../service/table.service';
import { TableFilterModule } from './filters/table-filter.module';
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
    TableMaterialModule,
    TableFilterModule
  ],
  exports: [
    TableComponent
  ],
  providers: [TableService, TableFilterService, TableCellService],
})
export class TableModule { }
