import { TestBed, inject } from '@angular/core/testing';

import { FetcherService } from './fetcher.service';

describe('FetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetcherService]
    });
  });

  it('should be created', inject([FetcherService], (service: FetcherService) => {
    expect(service).toBeTruthy();
  }));
});
