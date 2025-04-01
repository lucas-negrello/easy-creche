import {Component, inject} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KeyFilter} from 'primeng/keyfilter';
import {RouterLink} from '@angular/router';
import {FormBaseComponent} from '../../../core/components/form-base/form-base.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {ForgotPasswordRequest, LoginRequest} from '../../../core/interfaces/auth/auth.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ButtonDirective,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    KeyFilter,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent extends FormBaseComponent<unknown>{

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _authService: AuthService,
  ) {
    super(_fb, _authService);
  }

  protected buildForm(): void {
    this.form = this._fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
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
      const forgotData: ForgotPasswordRequest = {
        email: this.form.get('email')?.value,
      }
      this._authService.forgotPassword(forgotData).subscribe({
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
    this.toast.showToast("success", 'Email enviado com sucesso')
    this._router.navigate(['/auth/login']);
  }

  public override onSubmitError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.toast.showToast("error", 'O email informado não existe no sistema.')
    }
    else {
      this.toast.showToast('error', 'Erro ao enviar email', 'Um erro ocorreu ao tentar enviar email de recuperação. Por favor, verifique seus dados e tente novamente')
    }
  }

}
