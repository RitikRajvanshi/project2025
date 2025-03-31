import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLoginComponent } from './report-login.component';

describe('ReportLoginComponent', () => {
  let component: ReportLoginComponent;
  let fixture: ComponentFixture<ReportLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportLoginComponent]
    });
    fixture = TestBed.createComponent(ReportLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
