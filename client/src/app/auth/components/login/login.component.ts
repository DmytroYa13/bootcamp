import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from 'src/app/cabinet/services/author.service';

import { Form } from 'src/app/shared/classes/formValidation';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Form implements OnInit {

  constructor(
    private authService: AuthService,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      super();
     }

  ngOnInit(): void {
    this.initForm();
    this.setEmail();

    super.createValidationMessagesObject();
    super.validateFormSubscribe();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  setEmail(): void {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      if(email) {
        this.form.patchValue({email: email});
      }
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    console.log(this.form.value);
    this.authService.login(this.form.value).subscribe({
      next: (data) => {
        this.router.navigate(['/']);
        this.authorService.getAuthorData();
      },
      error: (e) => {
        console.log(e);
        this.form.enable();
      },
    });
  }
}
