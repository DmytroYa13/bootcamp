import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Post } from '../shared/interfaces/post.interface';
import { PostsService } from '../shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  getPostsSubscription: Subscription

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  ngOnDestroy(): void {
    this.getPostsSubscription.unsubscribe()
  }

  getPosts(): void {
    this.getPostsSubscription = this.postsService.getAll().subscribe((data: Post[]) => {
      this.posts = data
    })
  }

}
