import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AuthorService } from 'src/app/cabinet/services/author.service';
import { Form } from 'src/app/shared/classes/formValidation';
import { Author } from 'src/app/shared/interfaces/author.interface';
import { PostComment } from 'src/app/shared/interfaces/comment.interface';
import { CurrentAuthor } from 'src/app/shared/interfaces/current-author.type';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends Form implements OnInit {

  @Input() comments: PostComment[] = [];
  @Input() postId?: string = '';
  commentForm: PostComment;

  constructor(
    private commentService: CommentService,
    private authorService: AuthorService
  ) { super(); }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentAuthor();

    super.createValidationMessagesObject();
    super.validateFormSubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      comment: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]),
    });
  }

  getCurrentAuthor(): void {
    this.authorService.getAuthor()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      if(data) {
        this.commentForm = {author: data};
      }
    });
  }

  submitForm(){
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    console.log(this.form.value);

    const comment: any = { //TODO write interface for creating
      content: this.form.value.comment,
    };

    this.commentService.create(this.postId!, comment).subscribe({
      next: (data) => {
        this.comments.unshift({...data, author: this.commentForm.author});
        this.form.enable();
        this.form.reset();
      },
      error: (e) => {
        console.log(e);
        this.form.enable();
      },
    });
  }


}
