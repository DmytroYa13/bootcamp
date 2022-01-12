import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  formErrors: any = {
    userName: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.registerFormInit();
  }

  registerFormInit(): void {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('')])
    });
  }

  submitRegisterForm(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.disable();
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => console.log(data),
      error: (e) => {
        console.log(e);
        this.registerForm.enable();
      },
    });
  }

}
