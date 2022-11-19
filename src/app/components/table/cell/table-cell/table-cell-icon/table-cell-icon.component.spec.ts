import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellIconComponent } from './table-cell-icon.component';

describe('TableCellIconComponent', () => {
  let component: TableCellIconComponent;
  let fixture: ComponentFixture<TableCellIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCellIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableCellIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
