import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectuplineComponent } from './selectupline.component';

describe('SelectuplineComponent', () => {
  let component: SelectuplineComponent;
  let fixture: ComponentFixture<SelectuplineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectuplineComponent]
    });
    fixture = TestBed.createComponent(SelectuplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
