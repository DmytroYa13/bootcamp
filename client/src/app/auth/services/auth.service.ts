import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/interfaces/user.interface';

@Injectable()
export class AuthService {

  private apiUrl: string = '';

  constructor(
    private http: HttpClient
  ) { }

  login(user: User): Observable<any> { // TODO: change type after auth api
    return this.http.post<any>(this.apiUrl, user);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

}
