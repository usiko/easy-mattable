import { NgModule } from '@angular/core';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableCellTextComponent } from './table-cell/table-cell-text/table-cell-text.component';
import { TableCellLongtextComponent } from './table-cell/table-cell-longtext/table-cell-longtext.component';
import { TableCellIconComponent } from './table-cell/table-cell-icon/table-cell-icon.component';
import { TableCellLinkComponent } from './table-cell/table-cell-link/table-cell-link.component';
import { TableCellDateComponent } from './table-cell/table-cell-date/table-cell-date.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [


    TableCellComponent,
    TableCellTextComponent,
    TableCellLongtextComponent,
    TableCellIconComponent,
    TableCellLinkComponent,
    TableCellDateComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableCellComponent
  ],
  providers: [],
})
export class TableCellModule { }
