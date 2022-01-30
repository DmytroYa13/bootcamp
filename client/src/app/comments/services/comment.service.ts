import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, take } from 'rxjs';
import { API_BASE_URL } from 'src/app/shared/InjectionTokens/base-url';
import { PostComment } from 'src/app/shared/interfaces/comment.interface';

@Injectable()
export class CommentService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) apiUrl?: string
  ) {
    this.apiUrl = apiUrl ? `${apiUrl}/comments` : '';
  }

  create(postId: string, comment: PostComment): Observable<PostComment> {
    return this.http.post<PostComment>(`${this.apiUrl}/${postId}`, comment).pipe(take(1));
  }

}
