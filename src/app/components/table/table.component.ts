import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { ITableCell, ITableCellValue, ITableColumn, TableFilterTypeEnum } from '../service/table.model';
import { TableService } from '../service/table.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() columns: ITableColumn[] = [
  ];
  @Input() data: any[] = [];
  /** Data used by the table */
  public dataSource$: BehaviorSubject<MatTableDataSource<ITableCell<any>>> = new BehaviorSubject(new MatTableDataSource());

  constructor(private tableService: TableService<any>) { }

  ngOnInit(): void {
    this.dataSource$ = this.tableService.dataSource$; // binding datasource

    // we use our sorter
    this.tableService.setSortingFn((data, key) => this.sorting(data, key));

    // we use our cell adapter
    this.tableService.setCellAdapter((data: any[]) => this.cellAdapter(data));
    this.updateData();

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
  }

  updateData() {
    this.tableService.updateDataSource(this.data);
  }

  /**
   * sort functions
   */
  private sorting(data: ITableCell<any>, key: string) {
    const col = this.columns.find(item => item.key === key);
    const value = data[key];
    if (col) {
      switch (col.type) {
        case TableFilterTypeEnum.DATE:
          return (value?.value) ? new Date(value.value).getTime() : undefined;

        default:
          return data[key].value;
      }
    }
    else {
      return data[key].value;
    }
  }

  private cellAdapter(data: any[]): ITableCell<any>[] {
    return data.map(item => {
      const keys = Object.keys(item);
      const value: ITableCell<any> = {};
      for (const key of keys) {
        value[key] = this.cellAdapterByKey(item, key);
      }
      return value;
    });
  }

  /**
   * adapte all value for each column
   * @param data current  data
   * @param key current column key
   * @returns table cell value
   */
  private cellAdapterByKey(data: any, key: string): ITableCellValue<any> {
    switch (key) {
      default:
        return this.cellDefaultKeyAdapter(data[key]);
    }
  }

  /**
   * default adapter calue into table cell value
   * @param value current value
   * @returns table cell value
   */
  private cellDefaultKeyAdapter(value: any): ITableCellValue<string> {
    return {
      value: value,
      displayed: value
    };
  }

}
