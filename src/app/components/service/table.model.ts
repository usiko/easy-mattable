export interface ITableColumn {
  label: string;
  key: string;
  type?: TableCellTypeEnum,
  sort?: boolean;
  filter?: TableFilterTypeEnum;
}


/**
 * enum of type of filter
 */

export enum TableCellTypeEnum {
  DATE = "DATE"  // will show date range dropdown
}


// cell
/**
 * table cell value by key
 */
export type ITableCell<T> = { [key: string]: ITableCellValue<T>; };

/**
 * table cell adapter function type
 */
export type TableCellAdapter<T, V> = (data: T[]) => ITableCell<V>[];


/**
 * use only for class constuctor
 */
interface ITableCellValueConstruction<T> {
  value: T, //real value
  displayed?: string; // displayed text
}

/**
 * table cell value with value and displayed value
 */
export interface ITableCellValue<T> extends ITableCellValueConstruction<T> {
  displayed: string; // displayed text
}


/**
 * table cell value with value and displayed value
 */
export class TableCellValue<T> implements ITableCellValue<T>{
  /**
   * actual data value
   */
  value: T;

  /**
   * displayed data value
   */
  displayed: string;


  constructor(options: ITableCellValueConstruction<T>) {
    this.value = options.value;
    this.displayed = (options.displayed !== undefined) ? options.displayed : (options.value as any);
  }
}

/**
 * base filter interface
 */
export interface ITableFilter<ITableFilterValue> {

  /**
   * filter value
   */
  value?: ITableFilterValue,

  /**
   * data key where apply filter
   */
  key: string;
}

/**
 * base filter value interface
 */
export interface ITableFilterValue {
  /**
   * filter type
   */
  type: TableFilterTypeEnum;

  /**
   * actual filter value
   */
  value?: any;
}

/**
 * filter value date
 */
export interface ITableFilterDateValue extends ITableFilterValue {
  type: TableFilterTypeEnum;
  value?: {
    startDate?: Date | string;
    endDate?: Date | string;
  };
}

/**
 * filter value options
 */
export interface ITableFilterOptionsValue extends ITableFilterValue {
  type: TableFilterTypeEnum;
  value?: string[];

  /**
   * selectable option
   */
  options?: ITableCellValue<any>[];
}

/**
 * filter text options
 */
export interface ITableFilterTextValue extends ITableFilterValue {
  type: TableFilterTypeEnum;
  value?: string;
}



/**
 * enum of type of filter
 */

export enum TableFilterTypeEnum {
  TEXT = "text", // will show a search text dropdown
  OPTIONS = "options",  // will show a selection list dropdown
  SEARCHOPTIONS = "searchoptions",  // will show a selection list dropdown with search
  DATE = "DATE"  // will show date range dropdown
}


/**
 * base table filter class
 */
abstract class TableFilter<T extends ITableFilterValue> implements ITableFilter<T>
{
  public key: string;
  public value: T;
  constructor(options: ITableFilter<T>) {
    this.value = options.value || ({} as T);
    this.key = options.key;
  }

  setValueFilter(value: any): TableFilter<T> {
    this.value.value = value;
    return this;
  }
}


/**
 * table filter date, that will show a date range dropdown on header column for filter your data
 */
export class TableDateFilter extends TableFilter<ITableFilterDateValue> implements ITableFilter<ITableFilterDateValue>
{
  constructor(options: ITableFilter<ITableFilterDateValue>) {
    super(options);
    this.value.type = TableFilterTypeEnum.DATE;
  }

  override setValueFilter(value: { startDate?: Date, endDate?: Date; }): TableFilter<ITableFilterDateValue> {
    return super.setValueFilter(value);
  }
}


/**
 * table filter text, that will show a search text dropdown on header column for filter your data
 */
export class TableTextFilter extends TableFilter<ITableFilterTextValue> implements ITableFilter<ITableFilterTextValue>
{
  constructor(options: ITableFilter<ITableFilterTextValue>) {
    super(options);
    this.value.type = TableFilterTypeEnum.TEXT;
  }

  override setValueFilter(value: string): TableFilter<ITableFilterTextValue> {
    return super.setValueFilter(value);
  }
}

/**
 * table filter text, that will show an a list option selection on column header to filter your data
 */
export class TableOptionsFilter extends TableFilter<ITableFilterOptionsValue> implements ITableFilter<ITableFilterOptionsValue>
{
  constructor(options: ITableFilter<ITableFilterOptionsValue>) {
    super(options);
    this.value.type = TableFilterTypeEnum.OPTIONS;
    this.value.options = options.value?.options || [];
  }

  setOptions(options: ITableCellValue<any>[]) {
    this.value.options = options;
    return this;
  }

  override setValueFilter(value: string[]): TableFilter<ITableFilterOptionsValue> {
    return super.setValueFilter(value);
  }
}

/**
 * table filter text, that will show an a searchable list option selection on column header to filter your data
 */
export class TableSearchOptionFilter extends TableFilter<ITableFilterOptionsValue> implements ITableFilter<ITableFilterOptionsValue>
{
  constructor(options: ITableFilter<ITableFilterOptionsValue>) {
    super(options);
    this.value.type = TableFilterTypeEnum.SEARCHOPTIONS;
  }
}


