import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable()
export class LikesService {

  private apiUrl: string = '/api/posts'

  constructor(
    private http: HttpClient
  ) { }

  addLike(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/like`, null).pipe(take(1))
  }

  removeLike(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/like`).pipe(take(1))
  }

}
