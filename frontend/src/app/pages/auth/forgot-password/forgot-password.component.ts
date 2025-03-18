import {Component, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PasswordConfirmationValidator} from '../../../core/validators/password-confirmation-validator';
import {KeyFilter} from 'primeng/keyfilter';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ButtonDirective,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    KeyFilter
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  private readonly _fb: FormBuilder = inject(FormBuilder);

  protected form!: FormGroup;

  ngOnInit() {
    this.form = this._fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
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
