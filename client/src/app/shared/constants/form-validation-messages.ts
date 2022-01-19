import { ValidationMessages } from "../interfaces/form-validation.interface";

export enum ControlName {
  title = 'title',
  subTitle = 'subTitle',
  content = 'content',
  email = 'email',
  password = 'password',
  firstName = 'firstName',
  lastName = 'lastName',
  comment = 'comment',
}

export const validationMessages: ValidationMessages = {

  [ControlName.title]: {
    required: 'Field must be filled',
    minlength: 'Must be more than 1 characters',
    maxlength: 'Must be less than 50 characters',
  },

  [ControlName.subTitle]: {
    required: 'Field must be filled',
    minlength: 'Must be more than 1 characters',
    maxlength: 'Must be less than 50 characters',
  },

  [ControlName.content]: {
    required: 'Field must be filled',
    minlength: 'Must be more than 1 characters',
  },

  [ControlName.email]: {
    required: 'Field must be filled',
    email: 'Email is not correct',
  },

  [ControlName.password]: {
    required: 'Field must be filled',
    minlength: 'Must be more than 5 characters',
  },

  [ControlName.firstName]: {
    required: 'Field must be filled',
    minlength: 'Must be more than 2 characters',
  },

  [ControlName.lastName]: {
    required: 'Field must be filled',
    minlength: 'Must be more than 2 characters',
  },

  [ControlName.comment]: {
    required: 'Field must be filled',
    minlength: 'Must be more than 2 characters',
    maxlength: 'Must be less than 300 characters',
  },

};
