import { Injectable } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import * as moment from "moment";
import { BehaviorSubject } from "rxjs";
import { ITableCell, ITableCellValue, ITableFilter, ITableFilterDateValue, ITableFilterOptionsValue, ITableFilterTextValue, ITableFilterValue, TableCellValue, TableFilterTypeEnum } from "./table.model";

@Injectable()
export class TableFilterService<T> {

  /**
   * list of object that define filters
   */
  public filtersOptions$ = new BehaviorSubject<ITableFilter<ITableFilterValue>[]>([]);


  /**
   * @param stringifiedFilter stringified array of ITableFilter
   *
   */
  public dataSourceMultiFiltering(stringifiedFilters: string, data: ITableCell<any>): boolean {
    const filters: ITableFilter<ITableFilterValue>[] = this.stringToFilter(stringifiedFilters);
    for (const filter of filters) {
      const filtering = this.dataSourceSingleFiltering(filter, data);
      if (!filtering) {
        return false;
      }

    }
    return true;

  }

  /**
   * adding options selection to all filter type option ans searchable option
   */
  public getAllOptForOptFilters(dataSource: MatTableDataSource<ITableCell<any>>) {
    const filters = this.filtersOptions$.getValue();
    const optionsFilters: ITableFilter<ITableFilterOptionsValue>[] = filters.filter(filter => {
      return filter.value && (filter.value.type === TableFilterTypeEnum.OPTIONS || filter.value.type === TableFilterTypeEnum.SEARCHOPTIONS);
    });
    for (const optionsFilter of optionsFilters) {
      if (optionsFilter.value) {
        optionsFilter.value.options = this.getOptForOptFilters(dataSource, optionsFilter.key);
      }

    }
  }



  /**
   * apply a filter to data
   */
  private dataSourceSingleFiltering(filter: ITableFilter<ITableFilterValue>, data: ITableCell<any>): boolean {
    const cellValue = data[filter.key];
    const value = cellValue.value;
    // have to delete

    if (!filter.value?.value) {
      return true;
    }
    switch (filter.value.type) {
      case TableFilterTypeEnum.DATE:
        return this.dateFilter(filter.value, value);

      case TableFilterTypeEnum.OPTIONS:
      case TableFilterTypeEnum.SEARCHOPTIONS:
        return this.optionFilter(filter.value, value);
      case TableFilterTypeEnum.TEXT:
        return this.textFilter(filter.value, value);

      default:
        return false;
    }
  }

  /**
   * get all possible value by key data
   */
  private getOptForOptFilters(dataSource: MatTableDataSource<ITableCell<any>>, key: string): ITableCellValue<any>[] {
    return dataSource.data.reduce((acc: ITableCellValue<any>[], item) => {
      const itemValue = item[key];
      const findIndex = acc.findIndex(item => {
        return item.value === itemValue.value;
      });
      if (findIndex === -1) {
        acc.push(new TableCellValue(itemValue));
      }
      return acc;
    }, []);
  }

  /**
   * convert a json stringified filter to an obj filter
   */
  private stringToFilter(stringifiedFilters: any): ITableFilter<ITableFilterValue>[] {
    const filters: ITableFilter<ITableFilterValue>[] = JSON.parse(stringifiedFilters);
    for (const filter of filters) {
      if (filter.value) {
        filter.value = this.parseFilterValue(filter.value);
      }
    }
    return filters;
  }

  /**
   * parsing a value of filter from a json parsed object
   */
  private parseFilterValue(JSONparsedFilterValue: ITableFilterValue): ITableFilterValue {
    switch (JSONparsedFilterValue.type) {
      case TableFilterTypeEnum.DATE:
        const filter: ITableFilterDateValue = JSONparsedFilterValue;
        if (!filter.value) {
          filter.value = {};
        }
        if (filter.value.startDate) {
          filter.value.startDate = new Date(filter.value.startDate);
        }
        if (filter.value.endDate) {
          filter.value.endDate = new Date(filter.value.endDate);
        }

        return filter;

      default:
        return JSONparsedFilterValue;
    }
  }

  /**
   * filtering by data
   */
  private dateFilter(filter: ITableFilterDateValue, date: Date): boolean {
    const value = moment(date);
    if (filter.value?.startDate && filter.value?.endDate) {
      const start = moment(filter.value.startDate);
      const end = moment(filter.value.endDate);
      return value.isAfter(start) && value.isBefore(end);
    }
    else if (filter.value?.startDate) {
      const start = moment(filter.value.startDate);
      return value.isAfter(start);
    }
    else if (filter.value?.endDate) {
      const end = moment(filter.value.endDate);
      return value.isBefore(end);
    }
    return true;

  }


  /**
   * filtering by option selection
   */
  private optionFilter(filter: ITableFilterOptionsValue, search: string): boolean {
    return filter.value?.length == 0 || filter.value?.includes(search) || false;
  }

  /**
   * filtering by searching text in values
   */
  private textFilter(filter: ITableFilterTextValue, search: string): boolean {
    if (filter.value) {
      return search.toLowerCase().includes(filter.value.toLowerCase());
    }
    else {
      return false;
    }

  }

}
