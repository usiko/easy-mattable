import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableFilterDialogsModule } from './dialogs';
import { TableFilterMaterialModule } from './';
import { TableFilterComponent } from './';

@NgModule({
  declarations: [TableFilterComponent],
  imports: [CommonModule, TableFilterDialogsModule, TableFilterMaterialModule],
  providers: [],
  exports: [TableFilterComponent]
})
export class TableFilterModule {}
