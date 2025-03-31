import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcreditMComponent } from './debitcredit-m.component';

describe('DebitcreditMComponent', () => {
  let component: DebitcreditMComponent;
  let fixture: ComponentFixture<DebitcreditMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcreditMComponent]
    });
    fixture = TestBed.createComponent(DebitcreditMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
