import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl: string = ''

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl)
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(this.baseUrl)
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, post)
  }

  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(this.baseUrl, post)
  }

  delete(id: string) {
    return this.http.delete<Post>(this.baseUrl)
  }
}
