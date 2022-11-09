import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue, ITableColumn, TableCellTypeEnum } from '../..';


@Component({
  selector: 'app-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss']
})
export class TableCellComponent implements OnInit {
  @Input() data!: ITableCellValue<any>;
  @Input() column!: ITableColumn;
  types = TableCellTypeEnum;
  constructor() { }



  ngOnInit(): void {

  }

}
