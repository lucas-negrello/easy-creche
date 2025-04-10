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
import {AuthService} from '../../../../../core/services/auth/auth.service';
import {UserList} from '../../../../../core/interfaces/auth/auth.interface';
import {MultiSelect} from 'primeng/multiselect';
import {takeUntil} from 'rxjs/operators';
import {ApiResponse} from '../../../../../core/interfaces/http/api-response.interface';
import {UserInterface} from '../../../../../core/interfaces/user/user.interface';

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
        event_user_ids: [],
      }),
    });
    this._authService.users().subscribe({
      next: users => {
        const me: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;
        this.users.user = users.user.filter(user => (user.id !== me.id && user.id !== 1));
      }
    });
  }

  protected override patchFormValues(id: number | string): void {
    if (id) {
      this._schedulesService
        .findOne(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<ScheduleInterface>) => {
            this.form.patchValue({
              ...response.data,
              event_date: new Date(response.data.event_date),
              meta: {
                ...response.data.meta,
              }
            });
            const inputs = document.querySelectorAll("p-inputmask");
            inputs.forEach(input => {
              if (input.querySelector('input')?.value) {
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

  protected defineLabel(): string {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      return 'Retornar';
    }
    return 'Enviar';
  }

}
