import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InplayGamesComponent } from './inplay-games.component';

describe('InplayGamesComponent', () => {
  let component: InplayGamesComponent;
  let fixture: ComponentFixture<InplayGamesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InplayGamesComponent]
    });
    fixture = TestBed.createComponent(InplayGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
