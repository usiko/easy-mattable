import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue } from '../../../service';

@Component({
  selector: 'app-table-cell-boolean',
  templateUrl: './table-cell-boolean.component.html',
  styleUrls: ['./table-cell-boolean.component.scss']
})
export class TableCellBooleanComponent implements OnInit {
  @Input() data?: ITableCellValue<boolean>;
  constructor() {}

  ngOnInit(): void {}
}
