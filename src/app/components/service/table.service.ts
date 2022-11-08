import { Injectable, OnDestroy } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Subscription } from "rxjs";
import { TableFilterService } from "./table-filter.service";
import { ITableCell, ITableColumn, ITableFilter, ITableFilterValue, TableCellAdapter, TableDateFilter, TableFilterTypeEnum, TableOptionsFilter, TableSearchOptionFilter } from "./table.model";


@Injectable()
export class TableService<T> implements OnDestroy {

  public dataSource$ = new BehaviorSubject<MatTableDataSource<ITableCell<any>>>(new MatTableDataSource<ITableCell<any>>());
  private data: T[] = [];

  private tableCellAdapter: TableCellAdapter<T, any> = (data: any) => data;

  private filterFunction: (data: ITableCell<any>, filter: string) => boolean = (data: ITableCell<any>, filter: string) => {
    return this.filterService.dataSourceMultiFiltering(filter, data);
  };

  private subscription = new Subscription();

  private columns: ITableColumn[] = [];


  constructor(private filterService: TableFilterService<T>) { }


  public getData(): T[] {
    return this.data;
  }

  getFilters(): BehaviorSubject<ITableFilter<ITableFilterValue>[]> {
    return this.filterService.filtersOptions$;
  }


  /**
   * init data source option and service subscriptions
   */
  public initDataSource() {
    const datasource = this.dataSource$.getValue();
    datasource.filterPredicate = this.filterFunction;
    this.subscription.add(this.filterService.filtersOptions$.subscribe(filters => {
      datasource.filter = JSON.stringify(filters);
      this.filterService.getAllOptForOptFilters(this.dataSource$.getValue());

    }));
  }



  updateColums(columns: ITableColumn[]) {
    this.columns = columns;
    this.setFilters();

  }


  /**
   * set mat paginator to mat sort
   */
  setMatSort(matSort: MatSort) {
    const datasource = this.dataSource$.getValue();
    datasource.sort = matSort;
    this.dataSource$.next(datasource);
  }

  /**
   * set mat paginator to mat table
   */
  setPaginator(matPaginator: MatPaginator) {
    const datasource = this.dataSource$.getValue();
    datasource.paginator = matPaginator;
    this.dataSource$.next(datasource);
  }

  /**
   * set custom sorting function
   */
  setSortingFn(fn: (data: ITableCell<any>, sortHeaderId: string) => string | number) {
    const datasource = this.dataSource$.getValue();
    datasource.sortingDataAccessor = (data: ITableCell<any>, sortHeaderId: string) => {

      const col = this.columns.find(col => col.key === sortHeaderId);
      if (col && col.sortFn) {
        return col.sortFn(data);
      }
      return fn(data, sortHeaderId);
    };
    this.dataSource$.next(datasource);
  }

  /**
   * function adapter of data into table cell
   */
  setCellAdapter(fn: TableCellAdapter<T, any>) {
    this.tableCellAdapter = fn;
  }

  /**
   * setting a custom filter function for exmple , for implementing a server filtering function
   */
  setFilterFunction(fn: (data: ITableCell<any>, filter: string) => boolean) {
    this.filterFunction = fn;
  }


  /**
   * get mat table data source
   */
  updateDataSource(data: T[]) {
    const datasource = this.dataSource$.getValue();
    this.data = data;
    datasource.data = this.adapteDataToCell(data);
    this.dataSource$.next(datasource);
    this.filterService.getAllOptForOptFilters(this.dataSource$.getValue());
  }

  private adapteDataToCell(data: T[]): ITableCell<any>[] {
    return this.tableCellAdapter(data);
  }






  /**
   * updating current sort on data
   */
  updateSort(sort: MatSort): void {
    const datasource = this.dataSource$.getValue();
    datasource.sort = sort;

    this.dataSource$.next(datasource);
  }

  private setFilters() {
    const filters = this.columns
      .filter(col => !!col.filterType)
      .map(col => {
        switch (col.filterType) {
          case TableFilterTypeEnum.DATE:
            return new TableDateFilter({
              key: col.key
            });
          case TableFilterTypeEnum.TEXT:
            return new TableSearchOptionFilter({
              key: col.key
            });
          case TableFilterTypeEnum.SEARCHOPTIONS:
            return new TableSearchOptionFilter({
              key: col.key
            });
          case TableFilterTypeEnum.OPTIONS:
            return new TableOptionsFilter({
              key: col.key
            });

          default:
            return new TableSearchOptionFilter({
              key: col.key
            });
        }
      });
    this.filterService.filtersOptions$.next(filters);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
