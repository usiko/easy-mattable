import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellDateComponent } from './table-cell-date.component';

describe('TableCellDateComponent', () => {
  let component: TableCellDateComponent;
  let fixture: ComponentFixture<TableCellDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCellDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCellDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
