import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {KeyFilter} from 'primeng/keyfilter';
import {ButtonDirective} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    KeyFilter,
    ButtonDirective,
    Checkbox,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  private readonly _fb: FormBuilder = inject(FormBuilder);

  protected form!: FormGroup;

  ngOnInit() {
    this.form = this._fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      rememberMe: new FormControl(false, [Validators.required])
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
