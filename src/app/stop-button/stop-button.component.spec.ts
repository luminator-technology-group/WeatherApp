import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopButtonComponent } from './stop-button.component';

describe('StopButtonComponent', () => {
  let component: StopButtonComponent;
  let fixture: ComponentFixture<StopButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StopButtonComponent]
    });
    fixture = TestBed.createComponent(StopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
