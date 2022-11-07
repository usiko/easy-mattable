import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ITableFilterDateValue } from "@app/shared/table/service/table.model";
import { Subject } from "rxjs";
import { FilterDialog } from "../filter-dialog";



/** Component used to show all the surveysRun runned by the differents users of the website */
@Component({
	selector: 'dateFilterDialog',
	styleUrls: ['./dateFilterDialog.component.scss'],
	templateUrl: './dateFilterDialog.component.html',
})

/** Page for admin : SurveysRun overview */
export class DateFilterDialog extends FilterDialog<ITableFilterDateValue> implements OnInit {
	range = new FormGroup({
		startDate: new FormControl(null),
		endDate: new FormControl(null),
	});

	/**
	 * @constructor
	 */
	constructor(@Inject(MAT_DIALOG_DATA) public data: { change$: Subject<ITableFilterDateValue>, value: ITableFilterDateValue; }) {
		super();
	}


	ngOnInit(): void {
		super.ngOnInit();
		if (this.data.value?.value) {
			this.range.controls['startDate'].setValue(this.data.value.value.startDate);
			this.range.controls['endDate'].setValue(this.data.value.value.endDate);
		}

		this.range.valueChanges.subscribe((values: { startDate?: Date, endDate?: Date; }) => {
			this.data.value.value = values;
			this.debouncer$.next();
		});




	}

	clear(event: PointerEvent, formControlName: 'startDate' | 'endDate') {
		event.stopPropagation();
		if (formControlName) {
			this.range.controls[formControlName].setValue('');
		}
		else {
			this.range.controls['startDate'].setValue('');
			this.range.controls['endDate'].setValue('');
		}
		this.debouncer$.next();


	}


}
