import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableFilterMaterialModule } from '../material/table-filter-material.module';
import { DateFilterDialog } from './date-filter-dialog/dateFilterDialog.component';
import { OptionsFilterDialog } from './options-filter-dialog/optionsFilterDialog.component';
import { TextFilterDialog } from './text-filter-dialog/textFilterDialog.component';




@NgModule({
  declarations: [DateFilterDialog, TextFilterDialog, OptionsFilterDialog],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableFilterMaterialModule

  ],
  providers: [
  ],
  exports: [
    DateFilterDialog, TextFilterDialog, OptionsFilterDialog
  ]
})
export class TableFilterDialogsModule { }
