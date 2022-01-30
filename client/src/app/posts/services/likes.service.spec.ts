import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LikesService } from './likes.service';

describe('LikesService', () => {
  let service: LikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LikesService
      ]

    });
    service = TestBed.inject(LikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
