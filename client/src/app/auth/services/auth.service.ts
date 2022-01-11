import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Injectable()
export class AuthService {

  private apiUrl: string = '';

  constructor(
    private http: HttpClient
  ) { }

  login(author: Author): Observable<any> { // TODO: change type after auth api
    return this.http.post<any>(this.apiUrl, author);
  }

  register(author: Author): Observable<any> {
    return this.http.post<any>(this.apiUrl, author);
  }

}
