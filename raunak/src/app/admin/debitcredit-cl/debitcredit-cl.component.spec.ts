import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcreditClComponent } from './debitcredit-cl.component';

describe('DebitcreditClComponent', () => {
  let component: DebitcreditClComponent;
  let fixture: ComponentFixture<DebitcreditClComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcreditClComponent]
    });
    fixture = TestBed.createComponent(DebitcreditClComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
