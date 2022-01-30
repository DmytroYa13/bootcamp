import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared-module.module';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from '../loader/loader.module';
import { CommentService } from './services/comment.service';

const components = [CommentItemComponent, CommentsComponent];


@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    SharedModule,
    LoaderModule,
    ReactiveFormsModule
  ],
  providers: [CommentService]
})
export class CommentsModule { }
