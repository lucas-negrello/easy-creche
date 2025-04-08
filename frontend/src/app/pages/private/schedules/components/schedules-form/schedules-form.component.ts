import {Component, inject} from '@angular/core';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {ScheduleInterface} from '../../interfaces/schedule.interface';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {Fluid} from 'primeng/fluid';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {SchedulesService} from '../../services/schedules.service';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';
import {Textarea} from 'primeng/textarea';
import {Checkbox} from 'primeng/checkbox';
import {AuthService} from '../../../../../core/services/auth/auth.service';
import {UserList} from '../../../../../core/interfaces/auth/auth.interface';
import {MultiSelect} from 'primeng/multiselect';

@Component({
  selector: 'app-schedules-form',
  imports: [
    Button,
    FloatLabel,
    Fluid,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    DatePicker,
    Select,
    Textarea,
    Checkbox,
    MultiSelect,
  ],
  templateUrl: './schedules-form.component.html',
  styleUrl: './schedules-form.component.scss'
})
export class SchedulesFormComponent extends FormBaseComponent<ScheduleInterface>{
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _authService: AuthService = inject(AuthService);

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _schedulesService: SchedulesService,
  ) {
    super(_fb, _schedulesService);
    this._layoutService.updateTitle('Criação de Agendamento');
  }

  protected users: UserList = {} as UserList;

  protected get meta(): FormGroup {
    return this.form.get('meta') as FormGroup;
  }

  protected override buildForm(): void {
    this.form = this._fb.group({
      event_name: [null, [Validators.required]],
      event_date: [null, [Validators.required]],
      meta: this._fb.group({
        event_description: [null],
        event_type: [null],
        event_location: [null],
        event_duration: [null],
        event_urgency: [null],
        event_user_ids: [null],
        everyone: [false]
      }),
    });
    this._authService.users().subscribe({
      next: users => {
        this.users = users;
      }
    })
  }

  protected defineLabel(): string {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      return 'Retornar';
    }
    return 'Enviar';
  }

}
