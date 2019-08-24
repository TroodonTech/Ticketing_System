import { TestBed } from '@angular/core/testing';

import { PtorequestService } from './ptorequest.service';

describe('PtorequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PtorequestService = TestBed.get(PtorequestService);
    expect(service).toBeTruthy();
  });
});
