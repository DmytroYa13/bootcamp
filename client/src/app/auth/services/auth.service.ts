import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Author } from 'src/app/shared/interfaces/author.interface';
import { Token } from 'src/app/shared/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = '/api/auth';
  private token: string = '';
  private localStorageItemName: string = 'blog-token';

  constructor(
    private http: HttpClient
  ) { }

  register(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.apiUrl}/register`, author);
  }

  login(author: Author): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, author)
      .pipe(
        tap(({ token }) => {
          localStorage.setItem(this.localStorageItemName, token);
          this.setToken(token);
        }
        )
      );
  }

  checkIsTokenExist() {
    const token: string = localStorage.getItem(this.localStorageItemName)!;
    if (token) {
      this.setToken(token.toString());
    }
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logOut() {
    this.setToken('');
    localStorage.clear();
  }

}
