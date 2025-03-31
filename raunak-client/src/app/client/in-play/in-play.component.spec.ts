import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InPlayComponent } from './in-play.component';

describe('InPlayComponent', () => {
  let component: InPlayComponent;
  let fixture: ComponentFixture<InPlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InPlayComponent]
    });
    fixture = TestBed.createComponent(InPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
