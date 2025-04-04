import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossComponent } from './profit-loss.component';

describe('ProfitLossComponent', () => {
  let component: ProfitLossComponent;
  let fixture: ComponentFixture<ProfitLossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitLossComponent]
    });
    fixture = TestBed.createComponent(ProfitLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
