import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";

import { Subject, Subscription } from "rxjs";
import { take } from "rxjs/operators";
import { ITableCell, ITableFilter, ITableFilterValue, ITableFilterTextValue, TableFilterTypeEnum, ITableFilterOptionsValue, ITableFilterDateValue } from "src/app/components/service/table.model";
import { TableService } from "src/app/components/service/table.service";
import { DateFilterDialog } from "../dialogs/date-filter-dialog/dateFilterDialog.component";
import { OptionsFilterDialog } from "../dialogs/options-filter-dialog/optionsFilterDialog.component";
import { TextFilterDialog } from "../dialogs/text-filter-dialog/textFilterDialog.component";



/** Component used to show all the surveysRun runned by the differents users of the website */
@Component({
  selector: 'tableFilter',
  styleUrls: ['./tableFilter.component.scss'],
  templateUrl: './tableFilter.component.html',
})

/** Page for admin : SurveysRun overview */
export class TableFilterComponent implements OnChanges, OnInit, OnDestroy {

  /**
   * table data
   */
  @Input() dataSource: MatTableDataSource<ITableCell<any>> = new MatTableDataSource();

  /**
   * key of value in data
   */
  @Input() key: string = '';

  /**
   * event of filter value change
   */
  @Output() filterChange = new EventEmitter();

  currentFilter?: ITableFilter<ITableFilterValue>;
  dialogOpen = false;



  private afterClosedSub!: Subscription;
  private setFilterSub!: Subscription;

  private subscription = new Subscription();

  /**
   * @constructor
   */
  constructor(private tableService: TableService<any>, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.subscription.add(this.tableService.getFilters().subscribe((filters: ITableFilter<any>[]) => {
      this.getCurrentFilter();
    }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.getCurrentFilter();
    }
  }

  /**
   * get currentfilter using and filters list
   */
  private getCurrentFilter(): void {
    const filters = this.tableService.getFilters().getValue();
    const found = filters.find((item: ITableFilter<any>) => item.key === this.key);
    this.currentFilter = found;
  }

  /**
   * opening modal dialog filter
   */
  openFilter(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const subject = new Subject<ITableFilterTextValue>();
    if (this.setFilterSub) {
      this.setFilterSub.unsubscribe();
    }
    this.setFilterSub = subject.subscribe(value => {
      this.setFilter(value);
    });
    const component: any = this.getDialogComponent();
    this.dialogOpen = true;
    const dialog = this.dialog.open(component, {
      position: {
        top: event.clientY + 'px',
        left: event.clientX + 'px'
      },
      closeOnNavigation: true,
      panelClass: 'dialog-no-padding',
      data: {
        change$: subject,
        value: this.currentFilter?.value,
        searchable: this.currentFilter?.value?.type === TableFilterTypeEnum.SEARCHOPTIONS
      }
    });
    if (this.afterClosedSub) {
      this.afterClosedSub.unsubscribe();
    }
    this.afterClosedSub = dialog.afterClosed().pipe(take(1)).subscribe(() => {
      this.dialogOpen = false;
    });
  }

  /**
   * getting dialog component from filter type
   */
  private getDialogComponent() {
    switch (this.currentFilter?.value?.type) {
      case TableFilterTypeEnum.TEXT:
        return TextFilterDialog;
      case TableFilterTypeEnum.DATE:
        return DateFilterDialog;
      case TableFilterTypeEnum.OPTIONS:
      case TableFilterTypeEnum.SEARCHOPTIONS:
        return OptionsFilterDialog;
      default:
        return TextFilterDialog;
    }
  }

  /**
   * update and propagate filter
   */
  private setFilter(value: ITableFilterValue) {
    if (this.currentFilter) {


      this.currentFilter.value = this.handleEmptyValues(value);

      this.tableService.getFilters().next(this.tableService.getFilters().getValue());
    }
  }

  private handleEmptyValues(value: ITableFilterValue): ITableFilterValue {
    switch (value.type) {
      case TableFilterTypeEnum.OPTIONS:
      case TableFilterTypeEnum.SEARCHOPTIONS:
        const optionValue: ITableFilterOptionsValue = value;
        if (optionValue.value && optionValue.value.length === 0) {
          optionValue.value = undefined;
        }
        return optionValue;

      case TableFilterTypeEnum.DATE:
        const dateValue: ITableFilterDateValue = value;
        if (!dateValue.value || (!dateValue.value.startDate && !dateValue.value.endDate)) {
          dateValue.value = undefined;
        }
        return dateValue;

      case TableFilterTypeEnum.TEXT:
        const textValue: ITableFilterTextValue = value;
        if (!textValue.value || textValue.value.length === 0) {
          textValue.value = undefined;
        }
        return textValue;
      default:
        return value;
    }
  }


  ngOnDestroy(): void {
    if (this.setFilterSub) {
      this.setFilterSub.unsubscribe();
    }
    if (this.afterClosedSub) {
      this.afterClosedSub.unsubscribe();
    }
    this.subscription.unsubscribe();
  }


}
