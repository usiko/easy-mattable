import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { ITableFilterTextValue } from "src/app/components/service/table.model";
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
  constructor(@Inject(MAT_DIALOG_DATA) override data: { change$: Subject<ITableFilterTextValue>, value: ITableFilterTextValue; }) {
    super();
  }

  clear(event: MouseEvent) {
    event.stopPropagation();
    this.data.value.value = undefined;
    this.debouncer$.next();
  }
}
