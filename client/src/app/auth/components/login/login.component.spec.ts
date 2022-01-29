import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthorService } from 'src/app/cabinet/services/author.service';
import { AuthService } from '../../services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent when has email in URL', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const fakeAuthService = jasmine.createSpyObj("AuthService", ["login"]);
  const fakeAuthorService = jasmine.createSpyObj("AuthorService", ["getAuthorData"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: AuthorService, useValue: fakeAuthorService },
        { provide: ActivatedRoute, useValue: { queryParams: of({ email: 'test@test.com' }) } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.form.reset();
    fixture.detectChanges();
  });


  it('should set email into email input if there is email in queryParams', (done) => {

    const activatedRoute: ActivatedRoute = TestBed.inject(ActivatedRoute);

    activatedRoute.queryParams.subscribe((value) => {
      expect(value).toEqual({ email: 'test@test.com' });
      expect(component.form.controls['email'].value).toBe('test@test.com');
      done();
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.form).toBeTruthy();
  });


  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;

    const emailInput = compiled.querySelector('input[formcontrolname="email"]');
    const passwordEmail = compiled.querySelector('input[formcontrolname="password"]');
    const inputElements = compiled.querySelectorAll('input');

    expect(emailInput).toBeTruthy();
    expect(passwordEmail).toBeTruthy();
    expect(inputElements.length).toEqual(2);
  });


  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity when email in URL', () => {

    let errors: any = {};
    let email = component.form.controls['email'];
    expect(email.valid).toBeTruthy();

    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();

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
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();
  });

  // xit('form should be disable when valid after submitting', () => {

  //   component.form.controls['email'].setValue("test@test.com");
  //   component.form.controls['password'].setValue("123456789");

  //   component.submitForm();
  //   expect(component.form.disabled).toBeFalse();
  // });

});

describe('LoginComponent when has not email in URL', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const fakeAuthService = jasmine.createSpyObj("AuthService", ["getAuthorData"]);
  const fakeAuthorService = jasmine.createSpyObj("AuthorService", ["login"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: AuthorService, useValue: fakeAuthorService },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });


  it('should set empty formControl when no email in URL', (done) => {
    const activatedRoute: ActivatedRoute = TestBed.inject(ActivatedRoute);
    activatedRoute.queryParams.subscribe((value) => {
      expect(value).toEqual({});
      expect(component.form.controls['email'].value).toBe(null);
      done();
    });

  });

  it('email field validity without email in URL', () => {

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
});
