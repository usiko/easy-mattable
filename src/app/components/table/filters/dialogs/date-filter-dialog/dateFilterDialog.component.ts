import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ITableFilterDateValue } from '../../../service';
import { FilterDialog } from '../filter-dialog';

/** Component used to show all the surveysRun runned by the differents users of the website */
@Component({
  selector: 'dateFilterDialog',
  styleUrls: ['./dateFilterDialog.component.scss'],
  templateUrl: './dateFilterDialog.component.html'
})

/** Page for admin : SurveysRun overview */
export class DateFilterDialog extends FilterDialog<ITableFilterDateValue> implements OnInit {
  range: FormGroup<{
    startDate: FormControl<Date | undefined>;
    endDate: FormControl<Date | undefined>;
  }> = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });

  /**
   * @constructor
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) override data: { change$: Subject<ITableFilterDateValue>; value: ITableFilterDateValue }
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.data.value?.value) {
      this.range.controls['startDate'].setValue(this.data.value.value.startDate as Date);
      this.range.controls['endDate'].setValue(this.data.value.value.endDate as Date);
    }

    this.range.valueChanges.subscribe((values) => {
      this.data.value.value = values;
      this.debouncer$.next();
    });
  }

  clear(event: MouseEvent, formControlName: 'startDate' | 'endDate') {
    event.stopPropagation();
    if (formControlName) {
      this.range.controls[formControlName].setValue(undefined);
    } else {
      this.range.controls['startDate'].setValue(undefined);
      this.range.controls['endDate'].setValue(undefined);
    }
    this.debouncer$.next();
  }
}
