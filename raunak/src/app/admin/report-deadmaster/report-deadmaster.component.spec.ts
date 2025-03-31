import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDeadmasterComponent } from './report-deadmaster.component';

describe('ReportDeadmasterComponent', () => {
  let component: ReportDeadmasterComponent;
  let fixture: ComponentFixture<ReportDeadmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDeadmasterComponent]
    });
    fixture = TestBed.createComponent(ReportDeadmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
