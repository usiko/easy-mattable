import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectionListChange } from "@angular/material/list";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ITableCellValue, ITableFilterOptionsValue } from "src/app/components/service/table.model";


import { FilterDialog } from "../filter-dialog";



/** Component used to show all the surveysRun runned by the differents users of the website */
@Component({
  selector: 'optionsFilterDialog',
  styleUrls: ['./optionsFilterDialog.component.scss'],
  templateUrl: './optionsFilterDialog.component.html',
})

/** Page for admin : SurveysRun overview */
export class OptionsFilterDialog extends FilterDialog<ITableFilterOptionsValue> implements OnInit {

  // current displayd options
  public currentOptions: ITableCellValue<any>[] = [];

  public currentValues: string[] = [];


  public searchable = true;

  public textSearchOption = '';

  public selectedOptions = [];

  public allSelected = false;
  /**
   * @constructor
   */
  constructor(@Inject(MAT_DIALOG_DATA) override   data: { change$: Subject<ITableFilterOptionsValue>, value: ITableFilterOptionsValue, searchable: boolean; }) {
    super();
  }

  override  ngOnInit(): void {
    if (!this.data.value.value) {
      this.data.value.value = [];
    }
    if (this.data.change$) {
      this.subscription.add(this.debouncer$.pipe(debounceTime(350)).subscribe(() => {
        if (!this.data.value.value) {
          this.data.value.value = [];
        }
        // remove current working values
        const allValues = this.data.value.value.filter((value: any) => !this.currentOptions.map(item => item.value).includes(value));
        // add new values
        allValues.push(...this.currentValues);

        this.data.value.value = allValues;
        this.data.change$.next(this.data.value);
      }));
    }
    this.searchable = this.data.searchable;
    /**
     * if (this.data.change$) {
      this.subscription.add(this.debouncer$.pipe(debounceTime(350)).subscribe(() => {
        this.data.change$.next(this.data.value);
      }));
    }

     */
    this.currentOptions = [...this.data.value.options || []].sort();
    this.currentValues = [...this.data.value.value];
    this.updateAllSelect();
  }

  clear(event: PointerEvent, param?: string) {
    /*event.stopPropagation();
    this.data.value.value = [];
    this.debouncer$.next();*/
  }

  allSelectToggle(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.allSelected) {
      this.currentValues = [];
    }
    else {
      this.currentValues = [...this.currentOptions.map(item => item.value)];
    }
    this.onChange();
    this.updateAllSelect();
  }



  searchInOptions() {
    this.currentOptions = (this.data.value.options || []).filter((item: any) => {
      return item.displayed.toLowerCase().includes(this.textSearchOption.toLowerCase());
    }).sort();
    if (this.data.value.value) {
      this.currentValues = this.data.value.value.filter((item: any) => {
        return item.includes(this.textSearchOption.toLowerCase());
      });
    }
    else {
      this.currentValues = [];
    }


    this.updateAllSelect();

  }


  updateAllSelect() {
    this.allSelected = this.currentOptions.findIndex((option) => {
      return !this.currentValues.includes(option.value);
    }) === -1;
  }

  clearSearch() {
    this.textSearchOption = '';
    this.searchInOptions();
  }

  override onChange() {
    this.updateAllSelect();
    this.debouncer$.next();
  }

}
