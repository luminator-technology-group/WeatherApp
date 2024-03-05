import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLngComponent } from './lat-lng.component';

describe('LatLngComponent', () => {
  let component: LatLngComponent;
  let fixture: ComponentFixture<LatLngComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LatLngComponent]
    });
    fixture = TestBed.createComponent(LatLngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
