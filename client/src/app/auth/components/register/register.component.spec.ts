import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const fakeAuthService = jasmine.createSpyObj("AuthService", ["register"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeTruthy();
  });


  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;

    const firstNameInput = compiled.querySelector('input[formcontrolname="firstName"]');
    const lastNameInput = compiled.querySelector('input[formcontrolname="lastName"]');
    const emailInput = compiled.querySelector('input[formcontrolname="email"]');
    const passwordEmail = compiled.querySelector('input[formcontrolname="password"]');

    const inputElements = compiled.querySelectorAll('input');

    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordEmail).toBeTruthy();

    expect(inputElements.length).toEqual(4);
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('firstName field validity', () => {

    let errors: any = {};
    let email = component.form.controls['firstName'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("Iv");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    email.setValue("Ivan");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();

  });

  it('lastName field validity', () => {

    let errors: any = {};
    let email = component.form.controls['lastName'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("Iv");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    email.setValue("Ivanov");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();

  });

  it('email field validity', () => {

    let errors: any = {};
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();

    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['email']).toBeFalsy();

  });

  it('password field validity', () => {

    let errors: any = {};
    let password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    password.setValue("11");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();

  });

  it('should be valid if fields are filled', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['firstName'].setValue("Ivan");
    component.form.controls['lastName'].setValue("Ivanow");
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();
  });

});



