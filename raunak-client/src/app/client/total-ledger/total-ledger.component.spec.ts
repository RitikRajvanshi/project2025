import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLedgerComponent } from './total-ledger.component';

describe('TotalLedgerComponent', () => {
  let component: TotalLedgerComponent;
  let fixture: ComponentFixture<TotalLedgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalLedgerComponent]
    });
    fixture = TestBed.createComponent(TotalLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
