import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedGamesComponent } from './completed-games.component';

describe('CompletedGamesComponent', () => {
  let component: CompletedGamesComponent;
  let fixture: ComponentFixture<CompletedGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedGamesComponent]
    });
    fixture = TestBed.createComponent(CompletedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
