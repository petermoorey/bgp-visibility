import { TestBed } from '@angular/core/testing';

import { BgpDataService } from './bgp-data.service';

describe('BgpDataService', () => {
  let service: BgpDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BgpDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
