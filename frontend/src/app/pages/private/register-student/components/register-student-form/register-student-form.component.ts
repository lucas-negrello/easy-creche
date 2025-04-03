import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {Fluid} from "primeng/fluid";
import {InputText} from "primeng/inputtext";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {RegisterResponsibleService} from '../../../register-responsible/services/register-responsible.service';
import {RegisterStudentService} from '../../services/register-student.service';
import {StudentInterface} from '../../interfaces/student.interface';
import {map, Observable, of} from 'rxjs';
import {ResponsibleInterface} from '../../../register-responsible/interfaces/responsible.interface';
import {Select} from 'primeng/select';
import {AsyncPipe} from '@angular/common';
import {InputMask} from "primeng/inputmask";
import {KeyFilter} from "primeng/keyfilter";
import { BloodTypesService } from '../../../../../core/services/utils/blood-types.service';
import {BloodType} from "../../../../../core/interfaces/utils/blood-types.interface";
import {takeUntil} from "rxjs/operators";
import {ApiResponse} from "../../../../../core/interfaces/http/api-response.interface";

@Component({
  selector: 'app-register-student-form',
  imports: [
    Button,
    FloatLabel,
    Fluid,
    InputText,
    ReactiveFormsModule,
    Select,
    AsyncPipe,
    InputMask,
    KeyFilter
  ],
  templateUrl: './register-student-form.component.html',
  styleUrl: './register-student-form.component.scss'
})
export class RegisterStudentFormComponent extends FormBaseComponent<StudentInterface> {

  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _registerResponsiblesService: RegisterResponsibleService = inject(RegisterResponsibleService);
  private readonly _bloodTypesService: BloodTypesService = inject(BloodTypesService);

  protected responsibles$: Observable<ResponsibleInterface[]> = of([]);
  protected bloodTypes$: Observable<BloodType[]> = of([]);

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _registerStudentsService: RegisterStudentService,
  ) {
    super(_fb, _registerStudentsService);
    this._layoutService.updateTitle('Registro de Aluno');
    this.responsibles$ = this._registerResponsiblesService.findAll().pipe(
      map((res) => {
        if(res.success && res.data) return res.data;
        return [];
      })
    );
    this.bloodTypes$ = this._bloodTypesService.getBloodTypes();
  }

  protected override patchFormValues(id: number | string) {
    if (id) {
      this._registerStudentsService
          .findOne(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response: ApiResponse<StudentInterface>) => {
              this.form.patchValue(response.data ?? {});
              const inputs = document.querySelectorAll("p-inputmask");
              inputs.forEach(input => {
                if(input.querySelector('input')?.value) {
                  input.querySelector('input')?.classList.add('p-filled');
                }
              });
            },
            error: (error) => {
              this.navigateToParent(error);
            },
          });
    }
  }

  protected override buildForm(): void {
    this.form = this._fb.group({
      name: [null, [Validators.required]],
      responsible_id: [null],
      birth_certificate: [null, [Validators.required]],
      meta: this._fb.group({
        blood_type: [null],
        age: [null],
        allergies: [null],
        gender: [null],
        medical_convenience: [null],
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
