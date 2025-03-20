import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {DatatableComponent} from '../../../shared/datatable/datatable.component';
import {Observable, of} from 'rxjs';
import {
  CustomCellRendererParams
} from '../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';
import {ColDef, ICellRendererParams} from 'ag-grid-community';
import {TableCustomConfig} from '../../../shared/datatable/datatable.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminInterface} from './interfaces/admin.interface';

@Component({
  selector: 'app-register-admin',
  imports: [
    Card,
    DatatableComponent
  ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss'
})
export class RegisterAdminComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);

  protected loading: boolean = false;
  protected rowData$: Observable<AdminInterface[]> = of([
    {
      nome: 'fulana',
      cpf: '12345678900',
      endereco: 'rua abc, rio grande do sul, brasil',
      cargo: 'diretora',
      setor: 'diretoria',
      email: 'diretora@creche.com',
      celular: '54999876543',
    }
  ]);
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
      { headerName: 'Nome', field: 'nome' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    if(screenWidth <= 768) return [
      { headerName: 'Nome', field: 'nome' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    if(screenWidth <= 1024) return [
      { headerName: 'Nome', field: 'nome' },
      { headerName: 'CPF', field: 'cpf' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'celular' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    return [
      { headerName: 'Nome', field: 'nome' },
      { headerName: 'CPF', field: 'cpf' },
      { headerName: 'Endereço', field: 'endereco' },
      { headerName: 'Cargo', field: 'cargo' },
      { headerName: 'Setor', field: 'setor' },
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'celular' },
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
  }

  protected fetchRowData$(): void {

  }

  public edit(params: ICellRendererParams<AdminInterface>) {
    console.log('edit', params);
  }

  public view(params: ICellRendererParams<AdminInterface>) {
    console.log('view', params);
  }

  public delete(params: ICellRendererParams<AdminInterface>) {
    console.log('delete', params);
  }

  public add() {
    this._router.navigate(['create'], { relativeTo: this._route });
  }


}
