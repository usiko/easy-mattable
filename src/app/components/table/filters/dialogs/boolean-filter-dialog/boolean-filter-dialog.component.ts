import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, Subject } from 'rxjs';
import { ITableCellValue, ITableFilterBooleanValue } from '../../../service';
import { FilterDialog } from '../filter-dialog';

@Component({
  selector: 'app-boolean-filter-dialog',
  templateUrl: './boolean-filter-dialog.component.html',
  styleUrls: ['./boolean-filter-dialog.component.scss']
})
export class BooleanFilterDialogComponent extends FilterDialog<ITableFilterBooleanValue> implements OnInit {
  public selectedOptions = [];

  public allSelected = false;

  // current displayd options
  public currentOptions: ITableCellValue<any>[] = [];

  public currentValues: (boolean | undefined)[] = [];
  /**
   * @constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    override data: { change$: Subject<ITableFilterBooleanValue>; value: ITableFilterBooleanValue }
  ) {
    super();
  }
  override ngOnInit(): void {
    if (!this.data.value.value) {
      this.data.value.value = [];
    }
    if (this.data.change$) {
      this.subscription.add(
        this.debouncer$.pipe(debounceTime(350)).subscribe(() => {
          if (!this.data.value.value) {
            this.data.value.value = [];
          }
          // remove current working values
          const allValues = this.data.value.value.filter(
            (value: any) => !this.currentOptions.map((item) => item.value).includes(value)
          );
          // add new values
          allValues.push(...this.currentValues);

          this.data.value.value = allValues;
          this.data.change$.next(this.data.value);
        })
      );
    }
    this.currentOptions = [...(this.data.value.options || [])].sort();
    this.currentValues = [...this.data.value.value];
    this.updateAllSelect();
  }

  allSelectToggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.allSelected) {
      this.data.value.value = [];
    } else {
      this.data.value.value = this.data.value.options?.map((item) => item.value) || [];
    }
    this.onChange();
    this.updateAllSelect();
  }

  updateAllSelect() {
    this.allSelected =
      this.currentOptions.findIndex((option) => {
        return !this.currentValues.includes(option.value);
      }) === -1;
  }

  clear(event: PointerEvent, param?: string | undefined) {}
}
