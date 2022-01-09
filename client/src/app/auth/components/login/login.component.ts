import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  formErrors: any = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginFormInit();
  }

  loginFormInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(''),
      ]),
    });
  }

  submitLoginForm(): void {
    if (this.loginForm.invalid) return;
    this.loginForm.disable();
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => console.log(data),
      error: (e) => {
        console.log(e);
        this.loginForm.enable();
      },
    });
  }
}
