import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { API_BASE_URL } from 'src/app/shared/InjectionTokens/base-url';
import { Author } from 'src/app/shared/interfaces/author.interface';

const fakeAuthor: Author = {
  firstName: 'Ivan',
  lastName: 'Ivanov',
  email: 'test@test.com',
  password: '123456'
};

interface Storage {
  [key: string]: any
}

describe('AuthService', () => {

  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        { provide: API_BASE_URL, useValue: 'http://localhost:4200/api' }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });


  beforeEach(() => {
    var store: Storage = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string): string => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('apiUrl should be defined', () => {
    const apiUrl = TestBed.inject(API_BASE_URL);
    expect(authService['apiUrl']).toBe(`${apiUrl}/auth`);
  });

  it('should send register POST request', () => {

    authService.register(fakeAuthor).subscribe(data => {
      expect(data).toEqual({ email: 'test@test.com' });
      expect(data.email).toEqual(fakeAuthor.email);
    });

    const req = httpTestingController.expectOne('http://localhost:4200/api/auth/register');
    expect(req.request.method).toEqual("POST");
    req.flush({ email: 'test@test.com' });

  });

  it('should send login POST request and save token to localStorage', () => {

    authService.login(fakeAuthor).subscribe(data => {
      expect(data.token).toEqual('tokenValue');
      expect(localStorage.getItem('blog-token')).toBe('tokenValue');
    });

    const req = httpTestingController.expectOne('http://localhost:4200/api/auth/login');
    expect(req.request.method).toEqual("POST");
    req.flush({ token: 'tokenValue' });

  });

  it('check if token exists in localStorage', () => {
    expect(localStorage.getItem('blog-token')).toBeNull();

    authService.setToken('tokenValue');
    authService.checkIsTokenExist();

    expect(localStorage.getItem('blog-token')).toBe('tokenValue');

  });

  it('should clear token', () => {
    authService.setToken('tokenValue');
    authService.logOut();

    expect(localStorage.getItem('blog-token')).toBeNull();
    expect(authService['token']).toBe('');

  });

  it('check is authenticated', () => {
    expect(authService.isAuthenticated()).toBeFalse();

    authService.setToken('tokenValue');
    expect(authService.isAuthenticated()).toBeTruthy();

  });

  it('should set token', () => {
    authService.setToken('tokenValue');

    expect(localStorage.getItem('blog-token')).toBe('tokenValue');
    expect(authService['token']).toBe('tokenValue');

  });

  it('should return token', () => {
    authService.setToken('tokenValue');
    expect(authService.getToken()).toBe('tokenValue');

  });

});
