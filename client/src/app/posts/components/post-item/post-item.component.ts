import { Component, Input } from '@angular/core';
import { UpdatedLike } from 'src/app/shared/interfaces/updatedLike.interface';

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

  toggleLike(id: string) {
    this.isLikeChanging = true;
    this.likesService.toggleLike(id).subscribe({
      next: (updatedFields: UpdatedLike) => {
        this.post = {...this.post, ...updatedFields};
        this.isLikeChanging = false;
      },
      error: (e) => console.error(e),
    });
  }

}
