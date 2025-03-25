import {Component, inject} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabel} from "primeng/floatlabel";
import {Fluid} from "primeng/fluid";
import {InputText} from "primeng/inputtext";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {RegisterResponsibleService} from '../../../register-responsible/services/register-responsible.service';
import {RegisterStudentService} from '../../services/register-student.service';
import {StudentInterface} from '../../interfaces/student.interface';
import {map, Observable, of} from 'rxjs';
import {ResponsibleInterface} from '../../../register-responsible/interfaces/responsible.interface';
import {Select} from 'primeng/select';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-register-student-form',
  imports: [
    Button,
    FloatLabel,
    Fluid,
    InputText,
    ReactiveFormsModule,
    Select,
    AsyncPipe
  ],
  templateUrl: './register-student-form.component.html',
  styleUrl: './register-student-form.component.scss'
})
export class RegisterStudentFormComponent extends FormBaseComponent<StudentInterface>{

  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _registerResponsiblesService: RegisterResponsibleService = inject(RegisterResponsibleService);

  protected responsibles$: Observable<ResponsibleInterface[]> = of([]);

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
  }

  protected get meta(): FormGroup  {
    return this.form.controls['meta'] as FormGroup;
  }
  protected get urlDocuments(): FormArray {
    return this.meta.controls['url_documents'] as FormArray;
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
        url_documents: this._fb.array([]),
      }),
    });
    this.addDoc();
  }

  protected defineLabel(): string {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      return 'Retornar';
    }
    return 'Enviar';
  }

  protected removeDoc(index: number): void {
    this.urlDocuments.removeAt(index);
  }

  protected addDoc(): void {
    const docGroup = this._fb.group({
      docName: [null],
      docUrl: [null],
    })
    this.urlDocuments.push(docGroup);
  }
}
