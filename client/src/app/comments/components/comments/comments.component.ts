import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Form } from 'src/app/shared/classes/formValidation';
import { PostComment } from 'src/app/shared/interfaces/comment.interface';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends Form implements OnInit {

  @Input() comments: PostComment[] = [];
  @Input() postId?: string = '';

  constructor(
    private commentService: CommentService
  ) { super(); }

  ngOnInit(): void {
    this.initForm();

    super.createValidationMessagesObject();
    super.validateFormSubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      comment: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]),
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
        this.comments.unshift(data);
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
