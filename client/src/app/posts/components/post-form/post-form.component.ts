import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Loader } from 'src/app/loader/enums/loaders.enum';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { Form } from 'src/app/shared/classes/formValidation';
import { Tag } from 'src/app/shared/interfaces/tags.interface';
import { TagsService } from 'src/app/tags/services/tags.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent extends Form implements OnInit {

  tags: Observable<Tag[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private tagsService: TagsService,
    private postsService: PostsService,
    private router: Router,
    private loaderService: LoaderService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.getLoader(Loader.Tags);
    this.initForm();
    this.getTags();

    super.createValidationMessagesObject();
    super.validateFormSubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      subTitle: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(2),]),
      tags: new FormControl([])
    });
  }

  getTags(): void {
    this.tags = this.tagsService.getAll();
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    console.log(this.form.value);
    this.postsService.create(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (e) => {
        console.log(e);
        this.form.enable();
      },
    });
  }

}
