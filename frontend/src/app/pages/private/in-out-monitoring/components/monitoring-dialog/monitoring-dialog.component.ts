import {Component, inject, ViewEncapsulation} from '@angular/core';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {MonitoringService} from '../../services/monitoring.service';
import {MonitoringDialogDataType, MonitoringInterface} from '../../interfaces/monitoring.interface';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalService} from '../../../../../core/services/overlays/modal.service';
import {MonitoringValidator} from '../../../../../core/validators/monitoring-validator';
import {SelectButton} from 'primeng/selectbutton';
import {Select} from 'primeng/select';
import {ResponsibleInterface} from '../../../register-responsible/interfaces/responsible.interface';
import {RegisterStudentService} from '../../../register-student/services/register-student.service';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {InputMask} from 'primeng/inputmask';
import {KeyFilter} from 'primeng/keyfilter';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-monitoring-dialog',
  imports: [
    SelectButton,
    FormsModule,
    ReactiveFormsModule,
    Select,
    FloatLabel,
    InputText,
    ButtonDirective,
    InputMask,
    KeyFilter
  ],
  templateUrl: './monitoring-dialog.component.html',
  styleUrl: './monitoring-dialog.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MonitoringDialogComponent extends FormBaseComponent<MonitoringInterface>{

  private readonly _modalService: ModalService<unknown, MonitoringDialogDataType> = inject(ModalService);
  private readonly _registerStudentService: RegisterStudentService = inject(RegisterStudentService);

  protected data!: MonitoringDialogDataType;
  protected selectButtonOptions = [
    { name: 'Responsável Existente', value: 'existing' },
    { name: 'Responsável Diferente', value: 'new' }
  ];
  protected selectedOption = 'existing';
  protected responsibles!: Pick<ResponsibleInterface, 'id' | 'name'>[];
  constructor(
    protected override _fb: FormBuilder,
    protected readonly _monitoringService: MonitoringService,
  ) {
    super(_fb, _monitoringService);
    this.data = this._modalService.getData();
    if(this.data && this.data.studentId) this._registerStudentService.findOne(this.data.studentId).subscribe({
      next: (response) => {
        if(response.data.responsible) this.responsibles = [response.data.responsible]
      }
    })
  }
  protected clearForm(): void {
    this.form.reset();
  }

  protected override buildForm(): void {
    this.form = this._fb.group({
      responsible_id: [null],
      responsible: [null],
      responsible_cpf: [null],
    }, {validators: new MonitoringValidator().validate})
  }

  protected override submitForm() {
    if(this.data) {
      if(this.data.monitoring) {
        this._saveExit();
      }
      else {
        this._saveEntrance();
      }
    }
  }

  private _saveExit() {
    if(this.data && this.data.monitoring) {
      const updateData: MonitoringInterface = {
        ...this.data.monitoring,
        exit: new Date().toISOString(),
        meta: {
          ...this.data.monitoring.meta,
          exit: {
            responsible: this.form.get('responsible')?.value,
            responsible_cpf: this.form.get('responsible_cpf')?.value,
            responsible_id: this.form.get('responsible_id')?.value,
          }
        }
      };
      this._monitoringService.update(this.data.monitoring.id ?? '', updateData).subscribe({
        next: (response) => {
          this.toast.showToast('success', 'Saída registrada com sucesso')
          this._modalService.closeDialog();
          this._router.navigate(['/in-out-monitoring'], {queryParams: {refresh: true}});
        },
        error: (err: HttpErrorResponse) => {
          this.toast.showToast('error', 'Algum erro ocorreu ao registrar a saída', 'Por favor, revise os dados e tente novamente.');
        }
      })
    }
  }

  private _saveEntrance() {
    if(this.data && this.data.studentId) {
      const createData: MonitoringInterface = {
        entrance: new Date().toISOString(),
        register_student_id: this.data.studentId,
        meta: {
          entrance: {
            responsible: this.form.get('responsible')?.value,
            responsible_cpf: this.form.get('responsible_cpf')?.value,
            responsible_id: this.form.get('responsible_id')?.value,
          }
        }
      };
      this._monitoringService.create(createData).subscribe({
        next: (response) => {
          this.toast.showToast('success', 'Entrada registrada com sucesso')
          this._modalService.closeDialog();
          this._router.navigate(['/in-out-monitoring'], {queryParams: {refresh: true}});
        },
        error: (err: HttpErrorResponse) => {
          this.toast.showToast('error', 'Algum erro ocorreu ao registrar a entrada', 'Por favor, revise os dados e tente novamente.');
        }
      })
    }
  }
}
