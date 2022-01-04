import { TestBed } from '@angular/core/testing';

import { PostsFakeService } from './posts-fake.service';

describe('PostsFakeService', () => {
  let service: PostsFakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsFakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
