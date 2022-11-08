import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue } from 'src/app/components/service/table.model';

@Component({
  selector: 'app-table-cell-text',
  templateUrl: './table-cell-text.component.html',
  styleUrls: ['./table-cell-text.component.scss']
})
export class TableCellTextComponent implements OnInit {

  constructor() { }
  @Input() data!: ITableCellValue<string>;
  ngOnInit(): void {
  }

}
