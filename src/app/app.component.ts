import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ITableCellValue, ITableColumn, TableCellTypeEnum, TableFilterTypeEnum } from './components/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mattable';

  public mockbase: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', del: '' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', del: '' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', del: '' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', del: '' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', del: '' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', del: '' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', del: '' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', del: '' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', del: '' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', del: '' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', del: '' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', del: '' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', del: '' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', del: '' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', del: '' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', del: '' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', del: '' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', del: '' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', del: '' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', del: '' }
  ];

  public mock: any[] = [];

  public columns: ITableColumn[] = [
    {
      label: 'Date',
      key: 'date',
      type: TableCellTypeEnum.DATE,
      sort: true,
      filterType: TableFilterTypeEnum.DATE
    },
    {
      label: 'Postion',
      key: 'position',
      sort: true
    },
    {
      label: 'Nom',
      key: 'name',
      sort: true,
      filterType: TableFilterTypeEnum.TEXT,
      cellAdapter: (data: string) => {
        console.log('regular', data);
        const ret: ITableCellValue<string> = {
          value: data,
          displayed: data
        };
        return ret;
      },
      cellCSVAdapter: (data: ITableCellValue<string>) => {
        console.log('csv', data);
        return 'csv override';
      }
    },
    {
      label: 'Poids',
      key: 'weight',
      filterType: TableFilterTypeEnum.OPTIONS
    },
    {
      label: 'Symbol',
      key: 'symbol',
      filterType: TableFilterTypeEnum.SEARCHOPTIONS
    },
    {
      label: '',
      key: 'del',
      type: TableCellTypeEnum.ICON,
      onClick: (data) => {
        console.log('click', data);
      },
      cellAdapter: () => {
        const ret: ITableCellValue<string> = {
          value: 'edit',
          displayed: 'Modifier'
        };
        return ret;
      }
    }
  ];

  ngOnInit() {
    this.mock = this.mockbase.map((item, index) => {
      return {
        ...item,
        date: moment().add(index, 'day').toDate()
      };
    });
  }
}
