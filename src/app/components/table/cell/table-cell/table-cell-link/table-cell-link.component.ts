import { Component, Input, OnInit } from '@angular/core';
import { ITableCellValue } from 'src/app/components/service/table.model';

@Component({
  selector: 'app-table-cell-link',
  templateUrl: './table-cell-link.component.html',
  styleUrls: ['./table-cell-link.component.scss']
})
export class TableCellLinkComponent implements OnInit {

  constructor() { }
  @Input() data!: ITableCellValue<string>;
  ngOnInit(): void {
  }

}
