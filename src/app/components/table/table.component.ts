import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { TableCellService } from '../service/table-cell.service';
import { ITableCell, ITableCellValue, ITableColumn, TableCellTypeEnum, TableCellValue, TableFilterTypeEnum } from '../service/table.model';
import { TableService } from '../service/table.service';
import { TableCellService } from '../service/table-cell.service';
import { TableFilterService } from '../service/table-filter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers:[TableService, TableFilterService, TableCellService]
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() columns: ITableColumn[] = [
  ];
  @Input() data: any[] = [];
  /** Data used by the table */
  public dataSource$: BehaviorSubject<MatTableDataSource<ITableCell<any>>> = new BehaviorSubject(new MatTableDataSource());

  constructor(private tableService: TableService<any>, private tableCell: TableCellService) { }

  ngOnInit(): void {
    this.dataSource$ = this.tableService.dataSource$; // binding datasource

    // we use our sorter
    this.tableService.setSortingFn((data, key) => this.sorting(data, key));

    // we use our cell adapter
    this.tableService.setCellAdapter((data: any[]) => this.tableCell.cellAdapter(this.columns, data));


    this.updateData();

    this.updateFilters();

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
      this.updateData();
    }
    if (changes['columns']) {
      this.updateFilters();
    }
    //if
  }

  updateData() {
    this.tableService.updateDataSource(this.data);
  }

  updateFilters() {
    this.tableService.setFilters(this.columns);
  }
  /**
   * sort functions
   */
  private sorting(data: ITableCell<any>, key: string) {
    const col = this.columns.find(item => item.key === key);
    const value = data[key];
    if (col) {
      switch (col.type) {
        case TableCellTypeEnum.DATE:
          return (value?.value) ? new Date(value.value).getTime() : undefined;

        default:
          return data[key].value;
      }
    }
    else {
      return data[key].value;
    }
  }



}
