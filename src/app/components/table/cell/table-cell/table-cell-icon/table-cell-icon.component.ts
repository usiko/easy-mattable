import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue } from 'src/app/components/table/service/table.model';

@Component({
  selector: 'app-table-cell-icon',
  templateUrl: './table-cell-icon.component.html',
  styleUrls: ['./table-cell-icon.component.scss']
})
export class TableCellIconComponent implements OnInit {

  constructor() { }
  @Input() data!: ITableCellValue<string>;
  ngOnInit(): void {
  }

}
