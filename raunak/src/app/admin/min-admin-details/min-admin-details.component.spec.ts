import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinAdminDetailsComponent } from './min-admin-details.component';

describe('MinAdminDetailsComponent', () => {
  let component: MinAdminDetailsComponent;
  let fixture: ComponentFixture<MinAdminDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinAdminDetailsComponent]
    });
    fixture = TestBed.createComponent(MinAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
