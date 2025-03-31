import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupmasterDetailsComponent } from './supmaster-details.component';

describe('SupmasterDetailsComponent', () => {
  let component: SupmasterDetailsComponent;
  let fixture: ComponentFixture<SupmasterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupmasterDetailsComponent]
    });
    fixture = TestBed.createComponent(SupmasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
