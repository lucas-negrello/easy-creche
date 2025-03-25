import {Component, inject} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {AdminInterface} from '../../../register-admin/interfaces/admin.interface';
import {RegisterAdminService} from '../../../register-admin/services/register-admin.service';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {RegisterResponsibleService} from '../../services/register-responsible.service';
import {ResponsibleInterface} from '../../interfaces/responsible.interface';

@Component({
  selector: 'app-register-responsible-form',
  imports: [
    Fluid,
    FloatLabel,
    ReactiveFormsModule,
    InputText,
    Button
  ],
  templateUrl: './register-responsible-form.component.html',
  styleUrl: './register-responsible-form.component.scss'
})
export class RegisterResponsibleFormComponent extends FormBaseComponent<ResponsibleInterface>{

  private readonly _layoutService: LayoutService = inject(LayoutService);

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _registerResponsibleService: RegisterResponsibleService,
  ) {
    super(_fb, _registerResponsibleService);
    this._layoutService.updateTitle('Registro de Responsável');
  }

  protected override buildForm(): void {
    this.form = this._fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(8)]],
      meta: this._fb.group({
        cpf: [null, [Validators.minLength(11)]],
        address: [null],
        phone: [null, [Validators.minLength(11)]],
      }),
    });
  }

  protected defineLabel(): string {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      return 'Retornar';
    }
    return 'Enviar';
  }
}
