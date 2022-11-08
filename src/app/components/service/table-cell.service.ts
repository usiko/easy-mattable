import { Injectable } from "@angular/core";
import * as moment from "moment";
import { ITableCell, ITableCellValue, ITableColumn, TableCellTypeEnum, TableCellValue, TableFilterTypeEnum } from "./table.model";

@Injectable()
export class TableCellService {
  public cellAdapter(columns: ITableColumn[], data: any[]): ITableCell<any>[] {
    return data.map(item => {
      const keys = Object.keys(item);
      const value: ITableCell<any> = {};
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
  private cellAdapterByKey(columns: ITableColumn[], data: any, key: string): ITableCellValue<any> {
    const col = columns.find(item => item.key === key);
    if (col && col.cellAdapter) {
      return col.cellAdapter(data[key]);
    }
    switch (col?.type) {
      case TableCellTypeEnum.DATE:
        return this.cellDateAdapter(data[key]);
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

  /**
 * adapte date column value into a date table cell value
 * @param value current value
 * @returns table cell value
 */
  private cellDateAdapter(value: Date): ITableCellValue<Date> {
    return new TableCellValue({ value, displayed: moment(value).format('DD/MM/YYYY HH:mm') });
  }
}
