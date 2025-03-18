import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {KeyFilter} from 'primeng/keyfilter';
import {PasswordConfirmationValidator} from '../../../core/validators/password-confirmation-validator';

@Component({
  selector: 'app-register',
  imports: [
    ButtonDirective,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    KeyFilter
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _fb: FormBuilder = inject(FormBuilder);

  protected form!: FormGroup;

  ngOnInit() {
    this.form = this._fb.group({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    }, { validators: new PasswordConfirmationValidator().validate })
  }

  protected onSubmit() {
    if (this.form.invalid) {
      for (let controlsKey in this.form.controls) {
        this.form.controls[controlsKey].markAsTouched();
        this.form.controls[controlsKey].markAsDirty();
      }
    }
    if (this.form.valid) {
      console.log(this.form.value)
    }
  }

}
