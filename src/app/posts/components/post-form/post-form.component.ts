import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime,  Subscription } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {

  postForm: FormGroup
  postFormSubsrcription: Subscription

  formErrors: any = {
    author: '',
    title: '',
    content: ''
  }

  validationMessage: any = {
    author: {
      required: 'Field must be filled',
      minlength: 'Must be more than 1 characters',
      maxlength: 'Must be less than 50 characters',
    },
    title: {
      required: 'Field must be filled',
      minlength: 'Must be more than 1 characters',
      maxlength: 'Must be less than 50 characters',    },
    content: {
      required: 'Field must be filled',
      minlength: 'Must be more than 1 characters',
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.postFormInit()
    this.postFormSubscribe()
  }

  ngOnDestroy(): void {
    this.postFormSubsrcription.unsubscribe()
  }

  postFormInit() {
    this.postForm = new FormGroup({
      author: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      title: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(2),]),
    })
  }

  postFormSubscribe(){
    this.postFormSubsrcription = this.postForm.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(_ => this.onValueChanged())
  }

  onValueChanged() {
    let form = this.postForm
    if (!form || form.valid) return
    Object.keys(this.formErrors).forEach((field: string) => {
      this.formErrors[field] = ''
      let control = form.get(field)
      if ((control instanceof FormControl) && control.invalid) {
        let message = this.validationMessage[field]
        Object.keys(control.errors!).forEach((key: string) => {
          if(message[key]) {
            this.formErrors[field] += message[key] + " "
          }
        })
      }
    })
  }

  submitPostForm() {
    if (this.postForm.invalid) return
    console.log(this.postForm.value);
  }

}
