import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { TableFilterService } from './service';
import { TableCellService } from './service/table-cell.service';
import { TableCSVService } from './service/table-csv.service';
import { ITableBottomButton, ITableCell, ITableColumn, TableCellTypeEnum } from './service/table.model';
import { TableService } from './service/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [TableService, TableFilterService, TableCellService, TableCSVService]
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() columns: ITableColumn[] = [];
  @Input() data: any[] = [];
  @Input() activeSort?: { name: string; direction: SortDirection };
  //matSortActive="name" matSortDirection="asc"
  @Input() pageSizeOptions: number[] = [];
  @Input() rowClickable = false;
  @Input() exportable: boolean = false;
  @Input() bottomButtons: ITableBottomButton[] = [];
  @Output() clickRow = new EventEmitter<any>();
  @Output() bottomButtonClick = new EventEmitter<string>();
  /** Data used by the table */
  public dataSource$: BehaviorSubject<MatTableDataSource<ITableCell<any>>> = new BehaviorSubject(
    new MatTableDataSource()
  );

  constructor(
    private tableService: TableService<any>,
    private tableCell: TableCellService,
    private tableCSV: TableCSVService
  ) {}

  ngOnInit(): void {
    this.dataSource$ = this.tableService.dataSource$; // binding datasource

    // we use our sorter
    this.tableService.setSortingFn((data, key) => this.sorting(data, key));

    // we use our cell adapter
    this.tableService.setCellAdapter((data: any[]) => this.tableCell.cellAdapter(this.columns, data));

    this.tableService.updateDataSource(this.data);

    this.tableService.updateColums(this.columns);

    this.tableService.initDataSource();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      //this.dataSource.paginator = this.paginator;
      this.tableService.setPaginator(this.paginator);
    }
    if (this.sort) {
      this.tableService.setMatSort(this.sort);
      //this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.tableService.updateDataSource(this.data);
    }
    if (changes['columns']) {
      this.tableService.updateColums(this.columns);
    }
  }

  /**
   * sort functions
   */
  private sorting(data: ITableCell<any>, key: string) {
    const col = this.columns.find((item) => item.key === key);
    const value = data[key];
    if (col) {
      switch (col.type) {
        case TableCellTypeEnum.DATE:
          return value?.value ? new Date(value.value).getTime() : undefined;

        default:
          return value?.value;
      }
    } else {
      return value?.value;
    }
  }

  onCellClick(event: MouseEvent, col: ITableColumn, data: any) {
    if (col.onClick) {
      col.onClick(data);
    } else {
      if (this.rowClickable) {
        this.clickRow.emit(data);
      }
    }
  }

  onBottomButtonClick(id: string) {
    this.bottomButtonClick.emit(id);
  }

  exportcsv(): void {
    const csv = this.tableCSV.getCSV(this.columns, this.dataSource$.getValue().filteredData);

    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'data.csv';
    hiddenElement.click();
  }
}
