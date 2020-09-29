import { TestBed } from '@angular/core/testing';

import { RyberService } from './ryber.service';

describe('RyberService', () => {
  let service: RyberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RyberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
