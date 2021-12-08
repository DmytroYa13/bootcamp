import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { PostsService } from './posts.service';

const FAKE_POSTS: Post[] = [
  { author: 'John Dow', title: 'Natural language interface accessibility', date: new Date().toDateString(), likeNumber: 20, content: 'lorem' },
  { author: 'Anderson Bred', title: 'Accessibility of Remote Mettings', date: new Date().toDateString(), likeNumber: 2, content: 'lorem' },
]

@Injectable()
export class PostsFakeService extends PostsService {

  constructor(http: HttpClient) {
    super(http)
  }

  override getAll(): Observable<Post[]> {
    return of<Post[]>(FAKE_POSTS)
  }

  override getById(id: string) {
    return of<Post>(FAKE_POSTS[0])
  }

  override create(post: Post): Observable<Post> {
    return of<Post>(post)
  }

  override update(post: Post): Observable<Post> {
    return of<Post>(post)
  }

  override delete(id: string): Observable<any> {
    return of<any>(id)
  }
}
