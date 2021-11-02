import { TestBed, inject } from '@angular/core/testing';

import { ApirequestService } from './apirequest.service';

describe('ApirequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApirequestService]
    });
  });

  it('should be created', inject([ApirequestService], (service: ApirequestService) => {
    expect(service).toBeTruthy();
  }));
});
