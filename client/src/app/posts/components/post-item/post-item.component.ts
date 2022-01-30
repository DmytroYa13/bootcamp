import { Component, Input} from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../../../shared/interfaces/post.interface';
import { LikesService } from '../../services/likes.service';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post: Post;
  @Input() isContentVisible: boolean = false;
  isLikeChanging: boolean = false;

  constructor(
    private likesService: LikesService
  ) { }

  changeLike(id: string) {
    this.isLikeChanging = true;
    let likesStream$: Observable<Post>;
    if (this.post.isLiked) {
      likesStream$ = this.likesService.removeLike(id);
    } else {
      likesStream$ = this.likesService.addLike(id);
    }
    likesStream$.subscribe((post: Post) => {
      this.post = post;
      this.isLikeChanging = false;
    });
  }

}
