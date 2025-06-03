import {Component, inject} from '@angular/core';
import {PanicService} from '../../services/panic.service';
import {ModalService} from '../../../../../core/services/overlays/modal.service';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {PasswordConfirmationValidator} from '../../../../../core/validators/password-confirmation-validator';
import {ResetPasswordRequest} from '../../../../../core/interfaces/auth/auth.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {PanicInterface} from '../../interfaces/panic.interface';
import {ButtonDirective} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-panic-confirmation',
  imports: [
    ReactiveFormsModule,
    ButtonDirective,
    FloatLabel,
    InputText
  ],
  templateUrl: './panic-confirmation.component.html',
  styleUrl: './panic-confirmation.component.scss'
})
export class PanicConfirmationComponent extends FormBaseComponent<unknown>{

  private readonly _modalService: ModalService<any, any> = inject(ModalService);

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _panicService: PanicService,
  ) {
    super(_fb, _panicService);
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
      const panic: PanicInterface = {
        password: this.form.get('password')?.value,
        password_confirmation: this.form.get('password_confirmation')?.value
      }
      this._panicService.panic(panic).subscribe({
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
    this.toast.showToast("success", 'Emails enviados com sucesso', 'Todos os responsáveis foram notificados sobre a situação de emergência.');
    this._modalService.closeDialog();
  }

  public override onSubmitError(error: HttpErrorResponse) {
    if (error.status === 403) {
      this.toast.showToast('error', 'Erro de autenticação', 'A senha informada não corresponde à senha do usuário. Por favor, verifique e tente novamente.');
      return this._modalService.closeDialog();
    }
    this.toast.showToast('error', 'Erro ao enviar emails', 'Um erro ocorreu ao tentar enviar os emails. Por favor, tente novamente. Se o problema persistir, entre em contato com o suporte técnico.');
    return this._modalService.closeDialog();
  }
}
