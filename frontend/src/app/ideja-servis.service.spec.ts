import { TestBed } from '@angular/core/testing';

import { IdejaServisService } from './ideja-servis.service';

describe('IdejaServisService', () => {
  let service: IdejaServisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdejaServisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
