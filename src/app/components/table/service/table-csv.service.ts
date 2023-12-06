import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ITableCell, ITableCellValue, ITableColumn, TableCellTypeEnum } from './table.model';

@Injectable()
export class TableCSVService {
  public getCSV(columns: ITableColumn[], rows: ITableCell<any>[]): string {
    let csv = '';
    const adapted = this.cellAdapter(columns, rows);
    console.log(adapted);
    csv += columns.map((col) => '"' + col.label + '"').join(',') + '\n';
    for (const row of adapted) {
      csv += columns.map((col) => '"' + (row[col.key] ? row[col.key] : '') + '"').join(',') + '\n';
    }
    return csv;
  }

  private cellAdapter(columns: ITableColumn[], data: ITableCell<any>[]): { [key: string]: string }[] {
    return data.map((item) => {
      const keys = Object.keys(item);
      const value: { [key: string]: string } = {};
      for (const key of keys) {
        value[key] = this.cellAdapterByKey(columns, item, key);
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
  private cellAdapterByKey(columns: ITableColumn[], data: ITableCell<any>, key: string): string {
    const col = columns.find((item) => item.key === key);
    if (col && col.cellCSVAdapter) {
      return col.cellCSVAdapter(data[key]);
    }
    switch (col?.type) {
      case TableCellTypeEnum.DATE:
        return this.cellDateAdapter(data[key]);
      case TableCellTypeEnum.BOOLEAN:
        return this.cellBooleanAdapter(data[key]);
      default:
        return this.cellDefaultKeyAdapter(data[key]);
    }
  }

  /**
   * default adapter calue into table cell value
   * @param value current value
   * @returns table cell value
   */
  private cellDefaultKeyAdapter(value: ITableCellValue<string>): string {
    if (!value?.value) {
      return '';
    }
    return value.value;
  }

  /**
   * adapte date column value into a date table cell value
   * @param value current value
   * @returns table cell value
   */
  private cellDateAdapter(value: ITableCellValue<Date>): string {
    if (!value?.value) {
      return '';
    }
    return moment(value.value).format('DD/MM/YYYY HH:mm');
  }
  /**
   * adapte boolean column value into a date table cell value
   * @param value current value
   * @returns table cell value
   */
  private cellBooleanAdapter(value: ITableCellValue<Boolean>): string {
    if (value.value === true) {
      return 'oui';
    }
    if (value.value === false) {
      return 'non';
    }
    return 'non défini';
  }
}
