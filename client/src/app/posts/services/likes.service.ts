import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable()
export class LikesService {

  private apiUrl: string = '/api/posts';

  constructor(
    private http: HttpClient
  ) { }

  toggleLike(id: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/like`, null).pipe(take(1));
  }

}
