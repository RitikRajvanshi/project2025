import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitcreditSubAComponent } from './debitcredit-sub-a.component';

describe('DebitcreditSubAComponent', () => {
  let component: DebitcreditSubAComponent;
  let fixture: ComponentFixture<DebitcreditSubAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebitcreditSubAComponent]
    });
    fixture = TestBed.createComponent(DebitcreditSubAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
