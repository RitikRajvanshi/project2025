import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStakeComponent } from './edit-stake.component';

describe('EditStakeComponent', () => {
  let component: EditStakeComponent;
  let fixture: ComponentFixture<EditStakeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStakeComponent]
    });
    fixture = TestBed.createComponent(EditStakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
