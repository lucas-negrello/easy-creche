import {Component, inject} from '@angular/core';
import { LayoutService } from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {DatatableComponent} from '../../../shared/datatable/datatable.component';
import {BaseInjectionsComponent} from '../../../core/components/base-injections/base-injections.component';
import {map, Observable, of} from 'rxjs';
import {
  CustomCellRendererParams
} from '../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';
import {ColDef, ICellRendererParams, ValueFormatterParams, ValueGetterParams} from 'ag-grid-community';
import {TableCustomConfig} from '../../../shared/datatable/datatable.interface';
import {ChildDevelopmentService} from './services/child-development.service';
import {ChildDevelopmentInterface} from './interfaces/child-development.interface';
import {UserInterface} from '../../../core/interfaces/user/user.interface';
import {StudentInterface} from '../register-student/interfaces/student.interface';

@Component({
  selector: 'app-child-development',
  imports: [
    Card,
    DatatableComponent
  ],
  templateUrl: './child-development.component.html',
  styleUrl: './child-development.component.scss'
})
export class ChildDevelopmentComponent extends BaseInjectionsComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _childDevelopmentService: ChildDevelopmentService = inject(ChildDevelopmentService);

  protected currentUser: UserInterface = JSON.parse(this._authSessionService.getProfile() ?? '') as UserInterface;
  protected studentsAllowed: StudentInterface[] = JSON.parse(this._authSessionService.getStudents() ?? '[]') as StudentInterface[];

  protected userIsAdmin: boolean = !(this.currentUser.roles && this.currentUser.roles[0].name === ('user'));

  protected rowData$: Observable<ChildDevelopmentInterface[]> = of([]);
  protected cellRenderParamsAdmin: Partial<CustomCellRendererParams<ChildDevelopmentInterface>> = {
    format: 'ellipsis',
    actions: [
      {
        icon: 'pi-icon pi-eye',
        label: 'Ver',
        callback: (row: ICellRendererParams<ChildDevelopmentInterface>) => this.view(row),
      },
      {
        icon: 'pi-icon pi-pencil',
        label: 'Editar',
        callback: (row: ICellRendererParams<ChildDevelopmentInterface>) => this.edit(row),
      },
      {
        icon: 'pi-icon pi-trash',
        label: 'Excluir',
        callback: (row: ICellRendererParams<ChildDevelopmentInterface>) => this.delete(row),
        callbackConfirmationDialog: {},
      },
    ],
    width: 100
  };
  protected cellRenderParamsUser: Partial<CustomCellRendererParams<ChildDevelopmentInterface>> = {
    format: 'buttons',
    actions: [
      {
        icon: 'pi-icon pi-eye',
        label: 'Ver',
        callback: (row: ICellRendererParams<ChildDevelopmentInterface>) => this.view(row),
      },
    ],
    width: 100
  };
  protected colDefs: ColDef[] = this.colDefByWindowSize();
  protected custom: TableCustomConfig<ChildDevelopmentInterface> = {
    rowSelection: 'single',
  };

  ngOnInit() {
    this._layoutService.updateTitle('Registro de Desenvolvimento Infantil');
    this.fetchRowData$();
  }

  protected colDefByWindowSize(): ColDef[] {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 425) return [
      {
        headerName: 'Data',
        field: 'created_at',
        initialSort: 'desc',
        valueFormatter: (params: ValueFormatterParams<ChildDevelopmentInterface>) => {
          return new Date(params.value).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
        }
      },
      {
        headerName: 'Criado Por',
        field: 'created_by',
        valueGetter: (params: ValueGetterParams<ChildDevelopmentInterface>) => params.data?.register_admin.name ?? 'Não Informado'
      },
      {headerName: 'Ações', field: 'action', cellRendererParams:
          (this.currentUser.roles && this.currentUser.roles[0].name === ('user')) ?
            this.cellRenderParamsUser :
            this.cellRenderParamsAdmin},
    ]
    return [
      {
        headerName: 'Data',
        field: 'created_at',
        initialSort: 'desc',
        valueFormatter: (params: ValueFormatterParams<ChildDevelopmentInterface>) => {
          return new Date(params.value).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
        }
      },
      {
        headerName: 'Criado Por',
        field: 'created_by',
        valueGetter: (params: ValueGetterParams<ChildDevelopmentInterface>) => params.data?.register_admin.name ?? 'Não Informado'
      },
      {
        headerName: 'Aluno',
        field: 'student',
        valueGetter: (params: ValueGetterParams<ChildDevelopmentInterface>) => params.data?.student.name ?? 'Não Informado'
      },
      {headerName: 'Ações', field: 'action', cellRendererParams:
          (this.currentUser.roles && this.currentUser.roles[0].name === ('user')) ?
            this.cellRenderParamsUser :
            this.cellRenderParamsAdmin},
    ]
  }

  protected fetchRowData$(): void {
    this.rowData$ = this._childDevelopmentService.findAll().pipe(
      map(apiResponse => {
        return apiResponse.data.filter((childDevelopment) => {
          return this.studentsAllowed.some(student => student.id === childDevelopment.student_id);
        })
      })
    );
  }

  public edit(params: ICellRendererParams<ChildDevelopmentInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id, 'edit'], {relativeTo: this._route});
    }
  }

  public view(params: ICellRendererParams<ChildDevelopmentInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id], {relativeTo: this._route});
    }
  }

  public delete(params: ICellRendererParams<ChildDevelopmentInterface>) {
    const id = params.data?.id;
    if (id) {
      this._childDevelopmentService.delete(id).subscribe({
        next: () => {
          this.toast.showToast('success', 'Deletado com sucesso');
          this.loading = true;
          this.fetchRowData$();
          this.loading = false;
        },
        error: (err) => {
          this.toast.showToast('error', 'Falha ao deletar registro');
        }
      });
    }
  }

  public add() {
    this._router.navigate(['create'], {relativeTo: this._route});
  }
}
