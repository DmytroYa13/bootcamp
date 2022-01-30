import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { AUTHOR_DEFAULT_AVATAR_TOKEN } from 'src/app/shared/InjectionTokens/author-default-avatar';
import { PostComment } from 'src/app/shared/interfaces/comment.interface';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {

  @Input() comment: PostComment;
  @Input() template: TemplateRef<any>;

  constructor(
    @Inject(AUTHOR_DEFAULT_AVATAR_TOKEN)
    public authorDefaultAvatar: string,
  ){}

}
