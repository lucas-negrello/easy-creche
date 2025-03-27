import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {DatatableComponent} from '../../../shared/datatable/datatable.component';
import {catchError, map, Observable, of} from 'rxjs';
import {
  CustomCellRendererParams
} from '../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';
import {ColDef, ICellRendererParams, ValueGetterParams} from 'ag-grid-community';
import {TableCustomConfig} from '../../../shared/datatable/datatable.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminInterface} from './interfaces/admin.interface';
import {RegisterAdminService} from './services/register-admin.service';
import {BaseInjectionsComponent} from '../../../core/components/base-injections/base-injections.component';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register-admin',
  imports: [
    Card,
    DatatableComponent,
  ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss'
})
export class RegisterAdminComponent extends BaseInjectionsComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _registerAdminService: RegisterAdminService = inject(RegisterAdminService);

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
      { headerName: 'CPF', field: 'cpf', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta?.cpf ?? 'Não Informado'},
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'phone', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta?.phone ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'CPF', field: 'cpf', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta?.cpf ?? 'Não Informado' },
      { headerName: 'Endereço', field: 'address', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta?.address ?? 'Não Informado'},
      { headerName: 'Cargo', field: 'function', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta?.function ?? 'Não Informado'},
      { headerName: 'Setor', field: 'workspace', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta?.workspace ?? 'Não Informado'},
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'phone', valueGetter: (params: ValueGetterParams<AdminInterface>) => params.data?.meta?.phone ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
  }

  protected fetchRowData$(): void {
    this.rowData$ = this._registerAdminService.findAll().pipe(
      map(apiResponse => {
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
      if(this.user && this.user.id === id) {
        this.toast.showToast('error', 'Falha ao deletar Administrador',
          'Não é possível deletar o Administrador pois o mesmo está conecatdo nesta sessão. ' +
          'Por favor, acesse com outro usuário Administrador ou Super Administrador para deletar este Administrador.', 5000);
        return;
      }
      this._registerAdminService.delete(id).subscribe({
        next: () => {
          this.toast.showToast('success', 'Deletado com sucesso');
          this.loading = true;
          this.fetchRowData$();
          this.loading = false;
        },
        error: (err) => {
          console.log(err)
          this.toast.showToast('error', 'Falha ao deletar Administrador');
        }
      });
    }
  }

  public add() {
    this._router.navigate(['create'], { relativeTo: this._route });
  }


}
