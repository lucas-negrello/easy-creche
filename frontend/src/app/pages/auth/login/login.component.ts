import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {KeyFilter} from 'primeng/keyfilter';
import {ButtonDirective} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {FormBaseComponent} from '../../../core/components/form-base/form-base.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {LoginRequest, LoginResponse} from '../../../core/interfaces/auth/auth.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiResponse} from '../../../core/interfaces/http/api-response.interface';

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
export class LoginComponent extends FormBaseComponent<unknown> {

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _authService: AuthService
  ) {
    super(_fb, _authService);
  }


  protected buildForm() {
    this.form = this._fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      rememberMe: new FormControl(false, [Validators.required])
    })
  }

  protected override submitForm() {
    if (this.form.invalid) {
      for (let controlsKey in this.form.controls) {
        this.form.controls[controlsKey].markAsTouched();
        this.form.controls[controlsKey].markAsDirty();
      }
    }
    if (this.form.valid) {
      this.loading = true;
      const loginData: LoginRequest = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value
      }
      this._authService.login(loginData).subscribe({
        next: (response) => {
          this.loading = false;
          this.onSubmitSuccess();
        },
        error: (error: HttpErrorResponse) => {
          this.onSubmitError(error);
        }
      })
    }
  }

  public override onSubmitSuccess() {
    this._router.navigate(['']);
  }

}
