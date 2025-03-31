import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcreditAComponent } from './debitcredit-a.component';

describe('DebitcreditAComponent', () => {
  let component: DebitcreditAComponent;
  let fixture: ComponentFixture<DebitcreditAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcreditAComponent]
    });
    fixture = TestBed.createComponent(DebitcreditAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
