import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../shared/interfaces/post.interface';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post: Post

  changeLike(post: Post): void {
    post.isLiked = !post.isLiked
  }

}
