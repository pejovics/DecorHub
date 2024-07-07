import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IdejaServis } from './ideja-servis.service';

describe('IdejaService', () => {
  let service: IdejaServis;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IdejaServis);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
