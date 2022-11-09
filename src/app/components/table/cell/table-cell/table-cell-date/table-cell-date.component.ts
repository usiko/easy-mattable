import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue } from '../../../service';

@Component({
  selector: 'app-table-cell-date',
  templateUrl: './table-cell-date.component.html',
  styleUrls: ['./table-cell-date.component.scss']
})
export class TableCellDateComponent implements OnInit {
  @Input() data!: ITableCellValue<Date>;
  constructor() { }

  ngOnInit(): void {
  }

}
