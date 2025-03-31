import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMarketBookComponent } from './all-market-book.component';

describe('AllMarketBookComponent', () => {
  let component: AllMarketBookComponent;
  let fixture: ComponentFixture<AllMarketBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMarketBookComponent]
    });
    fixture = TestBed.createComponent(AllMarketBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
