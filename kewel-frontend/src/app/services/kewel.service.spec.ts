import { TestBed } from '@angular/core/testing';

import { KewelService } from './kewel.service';

describe('KewelService', () => {
  let service: KewelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KewelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
