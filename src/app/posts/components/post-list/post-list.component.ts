import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { Post } from '../../../shared/interfaces/post.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

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
