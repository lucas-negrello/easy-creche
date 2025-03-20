import { Component } from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {AdminInterface} from '../../interfaces/admin.interface';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterAdminService} from '../../services/register-admin.service';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-register-admin-form',
  imports: [
    Fluid,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './register-admin-form.component.html',
  styleUrl: './register-admin-form.component.scss'
})
export class RegisterAdminFormComponent extends FormBaseComponent<AdminInterface>{
  constructor(
    protected override _fb: FormBuilder,
    protected readonly _registerAdminService: RegisterAdminService,
  ) {
    super(_fb, _registerAdminService);
  }

  protected override buildForm(): void {
    this.form = this._fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      password_confirmation: [null, [Validators.required, Validators.minLength(8)]],
      meta: this._fb.group({
        cpf: [null, [Validators.required]],
        address: [null, [Validators.required]],
        function: [null, [Validators.required]],
        workspace: [null, [Validators.required]],
        phone: [null, [Validators.required]],
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
