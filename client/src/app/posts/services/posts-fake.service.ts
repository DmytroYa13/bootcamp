import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { Author } from 'src/app/shared/interfaces/author.interface';
import { PostsService } from './posts.service';

const FAKE_USER: Author = {
  firstName: 'Ivan',
  lastName: 'Ivanov',
  email: 'test@test.com'
};

const FAKE_POSTS: Post[] = [
  { author: FAKE_USER, title: 'Natural language interface accessibility', subTitle: 'test', likesQuantity: 20, isLiked: false, content: 'lorem' },
  { author: FAKE_USER, title: 'Accessibility of Remote Mettings', subTitle: 'test2', likesQuantity: 2, isLiked: true, content: 'lorem' },
];

@Injectable()
export class PostsFakeService extends PostsService {

  constructor(http: HttpClient) {
    super(http);
  }

  override getAll(): Observable<Post[]> {
    return of<Post[]>(FAKE_POSTS);
  }

  override getById(id: string) {
    return of<Post>(FAKE_POSTS[0]);
  }

  override create(post: Post): Observable<Post> {
    return of<Post>(post);
  }

  override update(post: Post): Observable<Post> {
    return of<Post>(post);
  }

  override delete(id: string): Observable<any> {
    return of<any>(id);
  }
}
