import {Component, inject} from '@angular/core';
import {DatatableComponent} from "../../../../../shared/datatable/datatable.component";
import {ColDef, ICellRendererParams, ValueGetterParams} from 'ag-grid-community';
import {ScheduleInterface} from '../../interfaces/schedule.interface';
import {map, Observable, of} from 'rxjs';
import {BaseInjectionsComponent} from '../../../../../core/components/base-injections/base-injections.component';
import {UserInterface} from '../../../../../core/interfaces/user/user.interface';
import {
  CustomCellRendererParams
} from '../../../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';
import {TableCustomConfig} from '../../../../../shared/datatable/datatable.interface';
import {LayoutService} from '../../../../../core/services/layout/layout.service';
import {SchedulesService} from '../../services/schedules.service';

@Component({
  selector: 'app-user-created-schedules',
    imports: [
        DatatableComponent
    ],
  templateUrl: './user-created-schedules.component.html',
  styleUrl: './user-created-schedules.component.scss'
})
export class UserCreatedSchedulesComponent extends BaseInjectionsComponent {

  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _schedulesService: SchedulesService = inject(SchedulesService);

  protected currentUser: UserInterface = {} as UserInterface;
  protected userCreatedSchedules$: Observable<ScheduleInterface[]> = of([]);
  ngOnInit() {
    this.currentUser = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;
    this.fetchRowDatas$();
  }

  protected cellRenderParams: Partial<CustomCellRendererParams<ScheduleInterface>> = {
    format: 'ellipsis',
    actions: [
      {
        icon: 'pi-icon pi-eye',
        label: 'Ver',
        callback: (row: ICellRendererParams<ScheduleInterface>) => this.view(row),
      },
      {
        icon: 'pi-icon pi-pencil',
        label: 'Editar',
        callback: (row: ICellRendererParams<ScheduleInterface>) => this.edit(row),
      },
      {
        icon: 'pi-icon pi-trash',
        label: 'Excluir',
        callback: (row: ICellRendererParams<ScheduleInterface>) => this.delete(row),
        callbackConfirmationDialog: {},
      },
    ],
    width: 100
  };
  protected colDefs: ColDef[] = this.colDefByWindowSize();
  protected custom: TableCustomConfig<ScheduleInterface> = {
    rowSelection: 'single',
  };

  protected colDefByWindowSize(): ColDef[] {
    const screenWidth = window.innerWidth;

    if(screenWidth <= 425) return [
      { headerName: 'Nome', field: 'event_name' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    if(screenWidth <= 768) return [
      { headerName: 'Nome', field: 'event_name' },
      { headerName: 'Data', field: 'event_date', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => {
          if(!params.data) return 'Não Informado';
          const date = new Date(params.data.event_date);
          return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(date);
        }},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    if(screenWidth <= 1024) return [
      { headerName: 'Nome', field: 'event_name' },
      { headerName: 'Data', field: 'event_date', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => {
          if(!params.data) return 'Não Informado';
          const date = new Date(params.data.event_date);
          return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(date);
        }},
      { headerName: 'Criado Por', field: 'created_by', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => params.data?.user?.name ?? 'Não Informado' },
      { headerName: 'Urgência', field: 'event_urgency', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => params.data?.meta?.event_urgency ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    return [
      { headerName: 'Nome', field: 'event_name' },
      { headerName: 'Data', field: 'event_date', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => {
          if(!params.data) return 'Não Informado';
          const date = new Date(params.data.event_date);
          return new Intl.DateTimeFormat('pt-BR', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }).format(date);
        }},
      { headerName: 'Criado Por', field: 'created_by', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => params.data?.user?.name ?? 'Não Informado' },
      { headerName: 'Urgência', field: 'event_urgency', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => params.data?.meta?.event_urgency ?? 'Normal'},
      { headerName: 'Endereço', field: 'location', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => params.data?.meta?.event_location ?? 'Creche'},
      { headerName: 'Duração', field: 'duration', valueGetter: (params: ValueGetterParams<ScheduleInterface>) => params.data?.meta?.event_duration ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
  }

  protected fetchRowDatas$(): void {
    this.userCreatedSchedules$ = this._schedulesService.findAll().pipe(
      map((response) => {
        return response.data.filter((schedule: ScheduleInterface) => {
          return (
            (schedule.created_by && this.currentUser.id && +schedule.created_by === +this.currentUser.id));
        })
      })
    );
  }

  public edit(params: ICellRendererParams<ScheduleInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id, 'edit'], { relativeTo: this._route });
    }
  }

  public view(params: ICellRendererParams<ScheduleInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id], { relativeTo: this._route });
    }
  }

  public delete(params: ICellRendererParams<ScheduleInterface>) {
    const id = params.data?.id;
    if (id) {
      this._schedulesService.delete(id).subscribe({
        next: () => {
          this.loading = true;
          this.fetchRowDatas$();
          this.loading = false;
        }
      });
    }
  }

  public add() {
    this._router.navigate(['create'], { relativeTo: this._route });
  }

}
