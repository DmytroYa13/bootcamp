import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { Loader } from 'src/app/loader/enums/loaders.enum';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { Post } from 'src/app/shared/interfaces/post.interface';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post: Post;
  isLoading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.getLoader(Loader.OnePost);
    this.getPost();
  }

  getPost():void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      })
    ).subscribe((data: Post) => {
      this.post = data;
    });
  }

}
