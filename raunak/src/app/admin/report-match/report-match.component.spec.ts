import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMatchComponent } from './report-match.component';

describe('ReportMatchComponent', () => {
  let component: ReportMatchComponent;
  let fixture: ComponentFixture<ReportMatchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportMatchComponent]
    });
    fixture = TestBed.createComponent(ReportMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
