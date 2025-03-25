import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {DatatableComponent} from '../../../shared/datatable/datatable.component';
import { ActivatedRoute, Router } from '@angular/router';
import {RegisterStudentService} from './services/register-student.service';
import {map, Observable, of} from 'rxjs';
import {StudentInterface} from './interfaces/student.interface';
import { CustomCellRendererParams } from '../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';
import {ColDef, ICellRendererParams, ValueGetterParams} from 'ag-grid-community';
import {TableCustomConfig} from '../../../shared/datatable/datatable.interface';

@Component({
  selector: 'app-register-student',
  imports: [
    Card,
    DatatableComponent
  ],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.scss'
})
export class RegisterStudentComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _registerStudentsService: RegisterStudentService = inject(RegisterStudentService);

  protected loading: boolean = false;
  protected rowData$: Observable<StudentInterface[]> = of([]);
  protected cellRenderParams: Partial<CustomCellRendererParams<StudentInterface>> = {
    format: 'ellipsis',
    actions: [
      {
        icon: 'pi-icon pi-eye',
        label: 'Ver',
        callback: (row: ICellRendererParams<StudentInterface>) => this.view(row),
      },
      {
        icon: 'pi-icon pi-pencil',
        label: 'Editar',
        callback: (row: ICellRendererParams<StudentInterface>) => this.edit(row),
      },
      {
        icon: 'pi-icon pi-trash',
        label: 'Excluir',
        callback: (row: ICellRendererParams<StudentInterface>) => this.delete(row),
        callbackConfirmationDialog: {},
      },
    ],
    width: 100
  };
  protected colDefs: ColDef[] = this.colDefByWindowSize();
  protected custom: TableCustomConfig<StudentInterface> = {
    rowSelection: 'single',
  };
  ngOnInit() {
    this._layoutService.updateTitle('Registro de Aluno');
    this.fetchRowData$();
  }

  protected colDefByWindowSize(): ColDef[] {
    const screenWidth = window.innerWidth;

    if(screenWidth <= 425) return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    if(screenWidth <= 768) return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'Responsável', field: 'responsible', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.responsible?.name ?? 'Não Informado' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    if(screenWidth <= 1024) return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'Responsável', field: 'responsible', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.responsible?.name ?? 'Não Informado' },
      { headerName: 'Certidão de Nasc.', field: 'birth_certificate' },
      { headerName: 'Tipo Sanguíneo', field: 'blood_type', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.meta?.blood_type ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'Responsável', field: 'responsible', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.responsible?.name ?? 'Não Informado' },
      { headerName: 'Certidão de Nasc.', field: 'birth_certificate' },
      { headerName: 'Tipo Sanguíneo', field: 'blood_type', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.meta?.blood_type ?? 'Não Informado'},
      { headerName: 'Genero', field: 'gender', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.meta?.gender ?? 'Não Informado'},
      { headerName: 'Alergias', field: 'allergies', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.meta?.allergies ?? 'Não Informado'},
      { headerName: 'Convênio Médico', field: 'medical_convenience', valueGetter: (params: ValueGetterParams<StudentInterface>) => params.data?.meta?.medical_convenience ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
  }

  protected fetchRowData$(): void {
    this.rowData$ = this._registerStudentsService.findAll().pipe(
      map(apiResponse => {
        return apiResponse.data;
      })
    );
  }

  public edit(params: ICellRendererParams<StudentInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id, 'edit'], { relativeTo: this._route });
    }
  }

  public view(params: ICellRendererParams<StudentInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id], { relativeTo: this._route });
    }
  }

  public delete(params: ICellRendererParams<StudentInterface>) {
    const id = params.data?.id;
    if (id) {
      this._registerStudentsService.delete(id).subscribe({
        next: () => {
          this.loading = true;
          this.fetchRowData$();
          this.loading = false;
        }
      });
    }
  }

  public add() {
    this._router.navigate(['create'], { relativeTo: this._route });
  }
}
