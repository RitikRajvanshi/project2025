import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcreditMaComponent } from './debitcredit-ma.component';

describe('DebitcreditMaComponent', () => {
  let component: DebitcreditMaComponent;
  let fixture: ComponentFixture<DebitcreditMaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcreditMaComponent]
    });
    fixture = TestBed.createComponent(DebitcreditMaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
