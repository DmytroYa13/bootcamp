import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_BASE_URL } from 'src/app/shared/InjectionTokens/base-url';

@Injectable()
export class LikesService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) apiUrl?: string
  ) {
    this.apiUrl = apiUrl ? `${apiUrl}/posts` : '';
  }

  toggleLike(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/like`, null).pipe(take(1));
  }

}
