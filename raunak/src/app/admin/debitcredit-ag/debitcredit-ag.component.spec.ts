import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcreditAgComponent } from './debitcredit-ag.component';

describe('DebitcreditAgComponent', () => {
  let component: DebitcreditAgComponent;
  let fixture: ComponentFixture<DebitcreditAgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcreditAgComponent]
    });
    fixture = TestBed.createComponent(DebitcreditAgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
