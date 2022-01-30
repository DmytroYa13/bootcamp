import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL } from 'src/app/shared/InjectionTokens/base-url';
import { Author } from 'src/app/shared/interfaces/author.interface';

import { AuthorService } from './author.service';

const fakeAuthor: Author = {
  firstName: 'Ivan',
  lastName: 'Ivanov',
  email: 'test@test.com',
  password: '123456'
};

describe('AuthorProfileService', () => {

  let authorService: AuthorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthorService,
        { provide: API_BASE_URL, useValue: 'http://localhost:4200/api' }
      ]
    });
    authorService = TestBed.inject(AuthorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authorService).toBeTruthy();
  });

  it('apiUrl should be defined', () => {
    const apiUrl = TestBed.inject(API_BASE_URL);
    expect(authorService['apiUrl']).toBe(`${apiUrl}/author`);
  });

  it('should get author data', (done) => {

    authorService.getAuthor().subscribe(result => {
      expect(result).toBeNull();
      done();
    });

  });

  it('should update author data', () => {

    const changes: Partial<Author> = {
      firstName: 'testFirstName'
    };

    authorService.update('111', changes ).subscribe(result => {
      expect(result?.firstName).toBe('testFirstName');
    });

    const req = httpTestingController.expectOne('http://localhost:4200/api/author/111');
    expect(req.request.method).toEqual("PATCH");

    req.flush({
      ...fakeAuthor,
      ...changes
    });

  });

});
