import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime, takeUntil } from "rxjs";

import { validationMessages } from "../constants/form-validation-messages";
import { FormError, ValidationMessages } from "../interfaces/form-validation.interface";
import { ObservableDestroy } from "./observable-destroy";


export abstract class Form extends ObservableDestroy {

  public form: FormGroup;

  public formValidationErrors: FormError;
  protected formValidationMessages: ValidationMessages;
  private messagesList: ValidationMessages = validationMessages;

  protected abstract initForm(): void;
  protected abstract submitForm(): void;


  protected validateFormSubscribe(): void {
    this.form.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(_ => this.onValueChanged());
  }

  private onValueChanged(): void {
    let form = this.form;
    if (!form || form.valid) {
      return;
    }

    Object.keys(this.formValidationErrors).forEach((field: string) => {
      this.formValidationErrors[field] = '';
      let control = form.get(field);
      if ((control instanceof FormControl) && control.invalid) {
        let message = this.formValidationMessages[field];
        Object.keys(control.errors!).forEach((key: string) => {
          if (message[key]) {
            this.formValidationErrors[field] += message[key] + " ";
          }
        });
      }
    });
  }

  protected createValidationMessagesObject() {
    let formProperties = Object.assign({}, this.form.value);
    let messages = Object.assign({}, formProperties);
    for (let key in messages) {
      if (messages.hasOwnProperty(key)) {
        if (this.messagesList[key]) {
          messages[key] = this.messagesList[key];
        }
      }
    }
    this.formValidationMessages = messages;
    this.formValidationErrors = formProperties;
  }

}
