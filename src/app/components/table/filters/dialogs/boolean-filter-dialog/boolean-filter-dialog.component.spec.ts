import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanFilterDialogComponent } from './boolean-filter-dialog.component';

describe('BooleanFilterDialogComponent', () => {
  let component: BooleanFilterDialogComponent;
  let fixture: ComponentFixture<BooleanFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooleanFilterDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BooleanFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
