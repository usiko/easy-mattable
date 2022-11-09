import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellBooleanComponent } from './table-cell-boolean.component';

describe('TableCellBooleanComponent', () => {
  let component: TableCellBooleanComponent;
  let fixture: ComponentFixture<TableCellBooleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCellBooleanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCellBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
