import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {BaseInjectionsComponent} from '../../../core/components/base-injections/base-injections.component';
import {UserInterface, UserRoleNames} from '../../../core/interfaces/user/user.interface';
import {StudentInterface} from '../register-student/interfaces/student.interface';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {MonitoringService} from './services/monitoring.service';
import {TableModule} from 'primeng/table';
import {MonitoringDialogDataType, MonitoringInterface} from './interfaces/monitoring.interface';
import {ButtonDirective} from 'primeng/button';
import {DatePipe} from '@angular/common';
import {ResponsibleInterface} from '../register-responsible/interfaces/responsible.interface';
import {AuthService} from '../../../core/services/auth/auth.service';
import {UserList} from '../../../core/interfaces/auth/auth.interface';
import {Tooltip} from 'primeng/tooltip';
import {ModalService} from '../../../core/services/overlays/modal.service';
import {MonitoringDialogComponent} from './components/monitoring-dialog/monitoring-dialog.component';

@Component({
  selector: 'app-in-out-monitoring',
  imports: [
    Card,
    Select,
    FormsModule,
    TableModule,
    ButtonDirective,
    DatePipe,
    Tooltip
  ],
  templateUrl: './in-out-monitoring.component.html',
  styleUrl: './in-out-monitoring.component.scss'
})
export class InOutMonitoringComponent extends BaseInjectionsComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _monitoringService: MonitoringService = inject(MonitoringService);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _modalService: ModalService<MonitoringDialogComponent, MonitoringDialogDataType> = inject(ModalService);

  private _studentMonitoring: MonitoringInterface[] = [];

  protected get studentMonitoring(): MonitoringInterface[] {
    return this._studentMonitoring;
  }
  protected set studentMonitoring(monitoring: MonitoringInterface[]) {
    this._studentMonitoring = monitoring;
  }

  protected selectedStudent!: number | string;
  protected users!: UserList;
  protected students: StudentInterface[] = JSON.parse(this._authSessionService.getStudents() ?? '') as StudentInterface[];
  protected currentUser: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;
  protected currentUserRole: UserRoleNames = this.currentUser.roles[0].name;

  ngOnInit() {
    this._layoutService.updateTitle('Monitoramento');
    this._authService.users().subscribe({
      next: users => {
        this.users = users;
      }
    });
    this._route.queryParams.subscribe(params => {
      if(params['refresh']) this.fetchData$();
    })
    this.fetchData$();
  }

  protected fetchData$() {
    this._monitoringService.findAll().subscribe({
      next: response => {
        this.studentMonitoring = response.data.filter(
          (monitoring) => monitoring.register_student_id === this.selectedStudent)
      }
    });
  }

  protected getStudent(id: number | string): StudentInterface | undefined {
    return this.students.find((student) => student.id === id);
  }

  protected getResponsibleNameById(id: number | string): string {
    return this.users.user
      .find(user => user.id === id)?.name ?? '';
  }

  protected setMonitoringData(studentId: number | string, id?: number | string): void {
    this._router.navigate(['/in-out-monitoring']);
    const monitoring = id ? this.studentMonitoring.find(monitoring => monitoring.id === id) ?? null : null;
    this._modalService.openDialog(MonitoringDialogComponent, {
      header: id ? 'Adicionar Saída' : 'Adicionar Entrada',
      closable: true,
      appendTo: 'body',
      modal: true,
      width: 'auto',
      height: 'auto',
      closeOnEscape: true,
      data: {
        studentId,
        monitoring,
      },
    })
  }
}
