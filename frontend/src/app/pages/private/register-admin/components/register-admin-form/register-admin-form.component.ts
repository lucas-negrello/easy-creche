import {Component, inject} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {AdminInterface} from '../../interfaces/admin.interface';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterAdminService} from '../../services/register-admin.service';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {PasswordConfirmationValidator} from '../../../../../core/validators/password-confirmation-validator';
import {InputMask} from 'primeng/inputmask';
import {KeyFilter} from 'primeng/keyfilter';

@Component({
  selector: 'app-register-admin-form',
  imports: [
    Fluid,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Button,
    InputMask,
    KeyFilter
  ],
  templateUrl: './register-admin-form.component.html',
  styleUrl: './register-admin-form.component.scss'
})
export class RegisterAdminFormComponent extends FormBaseComponent<AdminInterface>{

  private readonly _layoutService: LayoutService = inject(LayoutService);

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _registerAdminService: RegisterAdminService,
  ) {
    super(_fb, _registerAdminService);
    this._layoutService.updateTitle('Registro de Administrador');
  }

  protected override buildForm(): void {
    this.form = this._fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, this._router.url.includes('create') ? [Validators.required, Validators.minLength(8)] : null],
      password_confirmation: [null, this._router.url.includes('create') ? [Validators.required, Validators.minLength(8)] : null],
      meta: this._fb.group({
        cpf: [null],
        address: [null],
        function: [null],
        workspace: [null],
        phone: [null],
      }),
    },{ validators: new PasswordConfirmationValidator().validate });
  }

  protected defineLabel(): string {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      return 'Retornar';
    }
    return 'Enviar';
  }
}
