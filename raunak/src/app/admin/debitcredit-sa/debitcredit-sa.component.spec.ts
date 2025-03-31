import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcreditSaComponent } from './debitcredit-sa.component';

describe('DebitcreditSaComponent', () => {
  let component: DebitcreditSaComponent;
  let fixture: ComponentFixture<DebitcreditSaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcreditSaComponent]
    });
    fixture = TestBed.createComponent(DebitcreditSaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
