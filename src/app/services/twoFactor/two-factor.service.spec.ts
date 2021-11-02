import { TestBed } from '@angular/core/testing';

import { TwoFactorService } from './two-factor.service';

describe('TwoFactorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TwoFactorService = TestBed.get(TwoFactorService);
    expect(service).toBeTruthy();
  });
});
