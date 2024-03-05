import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoplistComponent } from './stop-list.component';

describe('StoplistComponent', () => {
  let component: StoplistComponent;
  let fixture: ComponentFixture<StoplistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoplistComponent]
    });
    fixture = TestBed.createComponent(StoplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
