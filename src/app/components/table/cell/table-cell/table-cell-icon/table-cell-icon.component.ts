import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue } from '../../../service';

@Component({
  selector: 'app-table-cell-icon',
  templateUrl: './table-cell-icon.component.html',
  styleUrls: ['./table-cell-icon.component.scss']
})
export class TableCellIconComponent implements OnInit {
  @Input() data?: ITableCellValue<string>;
  constructor() { }

  ngOnInit(): void {
  }

}
