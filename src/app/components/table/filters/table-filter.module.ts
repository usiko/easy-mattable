import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFilterDialogsModule } from './dialogs/table-filter-dialogs.module';
import { TableFilterMaterialModule } from './material/table-filter-material.module';
import { TableFilterComponent } from './tableFilter/tableFilter.component';




@NgModule({
  declarations: [TableFilterComponent],
  imports: [
    CommonModule,
    TableFilterDialogsModule,
    TableFilterMaterialModule

  ],
  providers: [
  ],
  exports: [
    TableFilterComponent
  ]
})
export class TableFilterModule { }