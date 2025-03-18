import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appPasswordConfirmationValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordConfirmationValidator,
      multi: true,
    }
  ]
})
export class PasswordConfirmationValidator implements Validator{
    validate(form: AbstractControl): ValidationErrors | null {
        const password = form.get('password')?.value;
        const password_confirmation = form.get('password_confirmation')?.value;

        if(password != password_confirmation) {
          return { passwordMismatch: true };
        }

        return null;
    }
}
