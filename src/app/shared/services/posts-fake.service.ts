import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../interfaces/post.interface';

const FAKE_POSTS: Post[] = [
  { author: 'John Dow', title: 'Natural language interface accessibility', date: new Date().toDateString(), likeNumber: 20, content: 'lorem' },
  { author: 'Anderson Bred', title: 'Accessibility of Remote Mettings', date: new Date().toDateString(), likeNumber: 2, content: 'lorem' },
]

@Injectable({
  providedIn: 'root'
})
export class PostsFakeService {

  constructor() { }

  getAll(): Observable<Post[]> {
    return of<Post[]>(FAKE_POSTS)
  }

  getById(id: string) {
    return of<Post>(FAKE_POSTS[0])
  }

  create(post: Post) {

  }

  update(id: string) {

  }

  delete(id: string) {

  }
}
