import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {BaseInjectionsComponent} from '../../../core/components/base-injections/base-injections.component';
import {UserInterface, UserRoleNames} from '../../../core/interfaces/user/user.interface';
import {StudentInterface} from '../register-student/interfaces/student.interface';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {ChildFrequencyService} from './services/child-frequency.service';
import {TableModule} from 'primeng/table';
import {ChildFrequencyInterface} from './interfaces/child-frequency.interface';
import {ButtonDirective} from 'primeng/button';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../../core/services/auth/auth.service';
import {UserList} from '../../../core/interfaces/auth/auth.interface';

@Component({
  selector: 'app-child-frequency',
  imports: [
    Card,
    Select,
    FormsModule,
    TableModule,
    ButtonDirective,
    DatePipe,
  ],
  templateUrl: './child-frequency.component.html',
  styleUrl: './child-frequency.component.scss'
})
export class ChildFrequencyComponent extends BaseInjectionsComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _childFrequencyService: ChildFrequencyService = inject(ChildFrequencyService);
  private readonly _authService: AuthService = inject(AuthService);

  private _frequency: ChildFrequencyInterface[] = [];

  protected get childFrequency(): ChildFrequencyInterface[] {
    return this._frequency;
  }
  protected set childFrequency(freq: ChildFrequencyInterface[]) {
    this._frequency = freq;
  }

  protected selectedStudent!: number | string;
  protected users!: UserList;
  protected students: StudentInterface[] = JSON.parse(this._authSessionService.getStudents() ?? '') as StudentInterface[];
  protected currentUser: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;
  protected currentUserRole: UserRoleNames = this.currentUser.roles[0].name;

  ngOnInit() {
    this._layoutService.updateTitle('Controle de Frequência');
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
    this._childFrequencyService.findAll().subscribe({
      next: response => {
        this.childFrequency = response.data.filter(
          (monitoring) => monitoring.register_student_id === this.selectedStudent)
      }
    });
  }

  protected calculateTime(entrance: Date, exit: Date): string {
    const entranceDate = new Date(entrance);
    const exitDate = new Date(exit);
    const diffMs = exitDate.getTime() - entranceDate.getTime();
    const diffMinutes = Math.round(diffMs / 60000);
    const hours = Math.round(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    return `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m`;
  }

  protected setChildFrequency (studentId: number | string, id?: number | string): void {
    const frequency = id ? this.childFrequency.find(frq => frq.id === id) ?? null : null;
    if(!frequency) {
      this._setEntranceDate(studentId);
      return;
    }
    if(frequency) {
      this._setExitDate(studentId, frequency)
      return;
    }
  }

  private _setEntranceDate(studentId: number | string) {
    if(studentId) {
      const createData: ChildFrequencyInterface = {
        entrance: new Date().toISOString(),
        register_student_id: studentId,
      };
      this._childFrequencyService.create(createData).subscribe({
        next: () => {
          this.toast.showToast('success', 'Entrada registrada com sucesso');
          this.fetchData$();
        },
        error: () => {
          this.toast.showToast('error', 'Algum erro ocorreu ao registrar a entrada', 'Por favor, revise os dados e tente novamente.');
        }
      })
    }
  }

  private _setExitDate(studentId: number | string, frequency : ChildFrequencyInterface) {
    if(studentId) {
      const updateData: ChildFrequencyInterface = {
        ...frequency,
        exit: new Date().toISOString(),
        register_student_id: studentId,
      };
      this._childFrequencyService.update(frequency.id ?? '', updateData).subscribe({
        next: () => {
          this.toast.showToast('success', 'Saída registrada com sucesso');
          this.fetchData$();
        },
        error: () => {
          this.toast.showToast('error', 'Algum erro ocorreu ao registrar a saída', 'Por favor, revise os dados e tente novamente.');
        }
      })
    }
  }
}
