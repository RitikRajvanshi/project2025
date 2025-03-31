import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplayLiveComponent } from './inplay-live.component';

describe('InplayLiveComponent', () => {
  let component: InplayLiveComponent;
  let fixture: ComponentFixture<InplayLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InplayLiveComponent]
    });
    fixture = TestBed.createComponent(InplayLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
