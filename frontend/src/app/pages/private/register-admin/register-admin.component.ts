import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {DatatableComponent} from '../../../shared/datatable/datatable.component';
import {map, Observable, of} from 'rxjs';
import {
  CustomCellRendererParams
} from '../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';
import {ColDef, ICellRendererParams, ValueGetterParams} from 'ag-grid-community';
import {TableCustomConfig} from '../../../shared/datatable/datatable.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminInterface} from './interfaces/admin.interface';
import {RegisterAdminService} from './services/register-admin.service';

@Component({
  selector: 'app-register-admin',
  imports: [
    Card,
    DatatableComponent,
  ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss'
})
export class RegisterAdminComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _registerAdminService: RegisterAdminService = inject(RegisterAdminService);

  protected loading: boolean = false;
  protected rowData$: Observable<AdminInterface[]> = of([]);
  protected cellRenderParams: Partial<CustomCellRendererParams<AdminInterface>> = {
    format: 'ellipsis',
    actions: [
      {
        icon: 'pi-icon pi-eye',
        label: 'Ver',
        callback: (row: ICellRendererParams<AdminInterface>) => this.view(row),
      },
      {
        icon: 'pi-icon pi-pencil',
        label: 'Editar',
        callback: (row: ICellRendererParams<AdminInterface>) => this.edit(row),
      },
      {
        icon: 'pi-icon pi-trash',
        label: 'Excluir',
        callback: (row: ICellRendererParams<AdminInterface>) => this.delete(row),
        callbackConfirmationDialog: {},
      },
    ],
    width: 100
  };
  protected colDefs: ColDef[] = this.colDefByWindowSize();
  protected custom: TableCustomConfig<AdminInterface> = {
    rowSelection: 'single',
  };
  ngOnInit() {
    this._layoutService.updateTitle('Registro de Administrador');
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
      { headerName: 'Email', field: 'email' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    if(screenWidth <= 1024) return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'CPF', field: 'cpf', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta.cpf},
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'phone', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta.phone},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'CPF', field: 'cpf', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta.cpf },
      { headerName: 'Endereço', field: 'address', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta.address},
      { headerName: 'Cargo', field: 'function', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta.function},
      { headerName: 'Setor', field: 'workspace', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta.workspace},
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'phone', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta.phone},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
  }

  protected fetchRowData$(): void {
    this.rowData$ = this._registerAdminService.findAll().pipe(
      map(apiResponse => {
        console.log(apiResponse.data);
        return apiResponse.data;
      })
    );
  }

  public edit(params: ICellRendererParams<AdminInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id, 'edit'], { relativeTo: this._route });
    }
  }

  public view(params: ICellRendererParams<AdminInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id], { relativeTo: this._route });
    }
  }

  public delete(params: ICellRendererParams<AdminInterface>) {
    const id = params.data?.id;
    if (id) {
      this._registerAdminService.delete(id).subscribe({
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
