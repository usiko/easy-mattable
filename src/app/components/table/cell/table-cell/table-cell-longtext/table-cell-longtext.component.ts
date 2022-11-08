import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue } from 'src/app/components/service/table.model';

@Component({
  selector: 'app-table-cell-longtext',
  templateUrl: './table-cell-longtext.component.html',
  styleUrls: ['./table-cell-longtext.component.scss']
})
export class TableCellLongtextComponent implements OnInit {

  constructor() { }
  @Input() data!: ITableCellValue<string>;
  ngOnInit(): void {
  }

}
