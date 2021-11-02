import { TestBed } from '@angular/core/testing';

import { SessionOutService } from './session-out.service';

describe('SessionOutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionOutService = TestBed.get(SessionOutService);
    expect(service).toBeTruthy();
  });
});
