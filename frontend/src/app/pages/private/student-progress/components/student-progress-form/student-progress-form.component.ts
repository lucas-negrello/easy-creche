import {Component, inject} from '@angular/core';
import {Fluid} from 'primeng/fluid';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {Button} from 'primeng/button';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {StudentProgressInterface} from '../../interfaces/student-progress.interface';
import {StudentProgressService} from '../../services/student-progress.service';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {StudentInterface} from '../../../register-student/interfaces/student.interface';

@Component({
  selector: 'app-student-progress-form',
  imports: [
    Fluid,
    FloatLabel,
    ReactiveFormsModule,
    Button,
    Select,
    Textarea
  ],
  templateUrl: './student-progress-form.component.html',
  styleUrl: './student-progress-form.component.scss'
})
export class StudentProgressFormComponent extends FormBaseComponent<StudentProgressInterface>{

  private readonly _layoutService: LayoutService = inject(LayoutService);

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _studentProgressService: StudentProgressService,
  ) {
    super(_fb, _studentProgressService);
    this._layoutService.updateTitle('Registro de Responsável');
  }

  protected students: StudentInterface[] = JSON.parse(this._authSessionService.getStudents() ?? '[]') as StudentInterface[];

  protected override buildForm(): void {
    this.form = this._fb.group({
      student_id: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  protected defineLabel(): string {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      return 'Retornar';
    }
    return 'Enviar';
  }
}
