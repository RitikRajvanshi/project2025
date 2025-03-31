import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenaDenaComponent } from './lena-dena.component';

describe('LenaDenaComponent', () => {
  let component: LenaDenaComponent;
  let fixture: ComponentFixture<LenaDenaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LenaDenaComponent]
    });
    fixture = TestBed.createComponent(LenaDenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
