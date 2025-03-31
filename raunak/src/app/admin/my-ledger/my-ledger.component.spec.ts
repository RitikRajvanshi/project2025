import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLedgerComponent } from './my-ledger.component';

describe('MyLedgerComponent', () => {
  let component: MyLedgerComponent;
  let fixture: ComponentFixture<MyLedgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLedgerComponent]
    });
    fixture = TestBed.createComponent(MyLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
