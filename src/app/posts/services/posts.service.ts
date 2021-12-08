import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/post.interface';

@Injectable()
export class PostsService {

  private apiUrl: string = ''

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl)
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(this.apiUrl)
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(this.apiUrl, post)
  }

  //TODO: response interface
  delete(id: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl)
  }
}
