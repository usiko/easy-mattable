import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellLongtextComponent } from './table-cell-longtext.component';

describe('TableCellLongtextComponent', () => {
  let component: TableCellLongtextComponent;
  let fixture: ComponentFixture<TableCellLongtextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCellLongtextComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCellLongtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
