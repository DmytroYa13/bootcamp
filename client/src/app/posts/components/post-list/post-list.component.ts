import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Loader } from 'src/app/loader/enums/loaders.enum';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { Post } from '../../../shared/interfaces/post.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postsList: Observable<Post[]>;
  getPostsSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private postsService: PostsService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.getLoader(Loader.Posts);
    this.postsList = this.postsService.getAll();
  }

}
