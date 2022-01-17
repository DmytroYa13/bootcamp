import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Form } from 'src/app/shared/classes/formValidation';
import { Author } from 'src/app/shared/interfaces/author.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends Form implements OnInit {

  validationSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    super();
   }

  ngOnInit(): void {
    this.initForm();
    super.createValidationMessagesObject();
    super.validateFormSubscribe();
  }

  initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  submitForm(): void {
    if (this.form.invalid) {
      return;
    }
    const data: Author = this.form.value;
    this.form.disable();
    this.authService.register(data).subscribe({
      next: (_) => {
        this.router.navigate(['/login'], { queryParams: { email: data.email } });
      },
      error: (e) => {
        console.log(e);
        this.form.enable();
      },
    });
  }

}
