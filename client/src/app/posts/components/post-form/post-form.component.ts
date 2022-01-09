import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Observable, Subscription } from 'rxjs';

import { Tag } from 'src/app/shared/interfaces/tags.interface';
import { TagsService } from 'src/app/tags/services/tags.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  postFormSubsrcription: Subscription;
  tags: Observable<Tag[]>;

  formErrors: any = {
    title: '',
    subTitle: '',
    content: '',
  };

  validationMessage: any = {
    title: {
      required: 'Field must be filled',
      minlength: 'Must be more than 1 characters',
      maxlength: 'Must be less than 50 characters',
    },
    subTitle: {
      required: 'Field must be filled',
      minlength: 'Must be more than 1 characters',
      maxlength: 'Must be less than 50 characters',
    },
    content: {
      required: 'Field must be filled',
      minlength: 'Must be more than 1 characters',
    }
  };

  constructor(
    private tagsService: TagsService,
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postFormInit();
    this.getTags();
    this.postFormSubscribe();
  }

  ngOnDestroy(): void {
    this.postFormSubsrcription.unsubscribe();
  }

  postFormInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      subTitle: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(2),]),
      tags: new FormControl([])
    });
  }

  getTags(): void {
    this.tags = this.tagsService.getAll();
  }

  postFormSubscribe(): void {
    this.postFormSubsrcription = this.postForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(_ => this.onValueChanged());
  }

  onValueChanged(): void {
    let form = this.postForm;
    if (!form || form.valid) return;
    Object.keys(this.formErrors).forEach((field: string) => {
      this.formErrors[field] = '';
      let control = form.get(field);
      if ((control instanceof FormControl) && control.invalid) {
        let message = this.validationMessage[field];
        Object.keys(control.errors!).forEach((key: string) => {
          if (message[key]) {
            this.formErrors[field] += message[key] + " ";
          }
        });
      }
    });
  }

  submitPostForm(): void {
    if (this.postForm.invalid) return;
    this.postForm.disable();
    console.log(this.postForm.value);
    this.postsService.create(this.postForm.value).subscribe({
      next: () => this.router.navigate(['/']) ,
      error: (e) => {
        console.log(e);
        this.postForm.enable();
      },
    });
  }

}
