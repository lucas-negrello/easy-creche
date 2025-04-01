import {Component, inject, Input} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from "primeng/inputtext";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PasswordConfirmationValidator} from '../../../core/validators/password-confirmation-validator';
import {FormBaseComponent} from '../../../core/components/form-base/form-base.component';
import {AuthService} from '../../../core/services/auth/auth.service';
import {LoginRequest, ResetPasswordRequest} from '../../../core/interfaces/auth/auth.interface';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-new-password',
    imports: [
        ButtonDirective,
        FloatLabel,
        InputText,
        ReactiveFormsModule
    ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent extends FormBaseComponent<unknown> {

  @Input() email!: string;
  @Input() token!: string;

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _authService: AuthService,
  ) {
    super(_fb, _authService);
  }

  protected buildForm(): void {
    this.form = this._fb.group({
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password_confirmation: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    }, { validators: new PasswordConfirmationValidator().validate })
  }

  protected override submitForm() {
    if (this.form.valid) {
      this.loading = true;
      const resetData: ResetPasswordRequest = {
        password: this.form.get('password')?.value,
        password_confirmation: this.form.get('password_confirmation')?.value
      }
      this._authService.resetPassword(this.token, this.email, resetData).subscribe({
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
    this.toast.showToast("success", 'Senha atualizada com sucesso')
    this._router.navigate(['/auth/login']);
  }

  public override onSubmitError(error: HttpErrorResponse) {
    if (error.status === 400) {
      this.toast.showToast("error", 'Token Expirado', 'Token já está expirado, por favor, envie novamente o email para recuperação da senha.')
    }
    else {
      this.toast.showToast('error', 'Erro ao realizar reset', 'Um erro ocorreu ao tentar recuperar a senha. Por favor, verifique seus dados e tente novamente')
    }
  }

}
