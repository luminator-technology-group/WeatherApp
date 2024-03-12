import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDestinationComponent } from './final-destination.component';

describe('FinalDestinationComponent', () => {
  let component: FinalDestinationComponent;
  let fixture: ComponentFixture<FinalDestinationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalDestinationComponent]
    });
    fixture = TestBed.createComponent(FinalDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
