import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMatchesPositionComponent } from './all-matches-position.component';

describe('AllMatchesPositionComponent', () => {
  let component: AllMatchesPositionComponent;
  let fixture: ComponentFixture<AllMatchesPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMatchesPositionComponent]
    });
    fixture = TestBed.createComponent(AllMatchesPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
