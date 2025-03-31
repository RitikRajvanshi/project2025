import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCommissionComponent } from './my-commission.component';

describe('MyCommissionComponent', () => {
  let component: MyCommissionComponent;
  let fixture: ComponentFixture<MyCommissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCommissionComponent]
    });
    fixture = TestBed.createComponent(MyCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
