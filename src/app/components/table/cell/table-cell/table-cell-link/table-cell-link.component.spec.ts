import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellLinkComponent } from './table-cell-link.component';

describe('TableCellLinkComponent', () => {
  let component: TableCellLinkComponent;
  let fixture: ComponentFixture<TableCellLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCellLinkComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TableCellLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
