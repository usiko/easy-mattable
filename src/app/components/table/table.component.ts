import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { ITableCell } from '../service/table.model';
import { TableService } from '../service/table.service';
import { ITableColumn } from './model';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() columns: ITableColumn[] = [
  ];
  @Input() data: any[] = [];
  /** Data used by the table */
  public dataSource$: BehaviorSubject<MatTableDataSource<ITableCell<any>>> = new BehaviorSubject(new MatTableDataSource());

  constructor(private tableService: TableService<any>) { }

  ngOnInit(): void {
    this.dataSource$ = this.tableService.dataSource$;
    this.updateData();

  }

  ngAfterViewInit() {

    if (this.paginator) {
      //this.dataSource.paginator = this.paginator;
      this.tableService.setPaginator(this.paginator);
    }
    if (this.sort) {
      this.tableService.setMatSort(this.sort);
      //this.dataSource.sort = this.sort;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateData();
    }
  }

  updateData() {
    this.tableService.updateDataSource(this.data);
  }


}
