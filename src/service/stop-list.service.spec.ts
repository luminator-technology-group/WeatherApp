import { TestBed } from '@angular/core/testing';

import { StopListService } from './stop-list.service';

describe('StopListService', () => {
  let service: StopListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
