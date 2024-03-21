import { TestBed } from '@angular/core/testing';

import { StopButtonService } from './stop-button.service';

describe('StopButtonService', () => {
  let service: StopButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
