import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ITableFilterTextValue } from "@app/shared/table/service/table.model";
import { Subject } from "rxjs";
import { FilterDialog } from "../filter-dialog";



/** Component used to show all the surveysRun runned by the differents users of the website */
@Component({
	selector: 'textFilterDialog',
	styleUrls: ['./textFilterDialog.component.scss'],
	templateUrl: './textFilterDialog.component.html',
})

/** Page for admin : SurveysRun overview */
export class TextFilterDialog extends FilterDialog<ITableFilterTextValue> {

	/**
	 * @constructor
	 */
	constructor(@Inject(MAT_DIALOG_DATA) public data: { change$: Subject<ITableFilterTextValue>, value: ITableFilterTextValue; }) {
		super();
	}

	clear(event: PointerEvent) {
		event.stopPropagation();
		this.data.value.value = null;
		this.debouncer$.next();
	}
}
