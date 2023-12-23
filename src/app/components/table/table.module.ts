import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TableCellModule } from './cell';
import { TableFilterModule } from './filters';
import { TableMaterialModule } from './material/table-material.module';
import { MapPipe } from './pipe';
import { TableCellService, TableFilterService, TableService } from './service';
import { TableCSVService } from './service/table-csv.service';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TableComponent, MapPipe],
  imports: [CommonModule, TableMaterialModule, TableFilterModule, TableCellModule, MatTooltipModule],
  exports: [TableComponent],
  providers: []
})
export class TableModule {}
