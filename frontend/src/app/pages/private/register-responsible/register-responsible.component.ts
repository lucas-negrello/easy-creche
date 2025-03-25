import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from "primeng/card";
import {DatatableComponent} from "../../../shared/datatable/datatable.component";
import {ActivatedRoute, Router} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {ResponsibleInterface} from './interfaces/responsible.interface';
import {
  CustomCellRendererParams
} from '../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';
import {ColDef, ICellRendererParams, ValueGetterParams} from 'ag-grid-community';
import {TableCustomConfig} from '../../../shared/datatable/datatable.interface';
import {RegisterResponsibleService} from './services/register-responsible.service';

@Component({
  selector: 'app-register-responsible',
    imports: [
        Card,
        DatatableComponent
    ],
  templateUrl: './register-responsible.component.html',
  styleUrl: './register-responsible.component.scss'
})
export class RegisterResponsibleComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _router: Router = inject(Router);
  private readonly _route: ActivatedRoute = inject(ActivatedRoute);
  private readonly _registerResponsiblesService: RegisterResponsibleService = inject(RegisterResponsibleService);

  protected loading: boolean = false;
  protected rowData$: Observable<ResponsibleInterface[]> = of([]);
  protected cellRenderParams: Partial<CustomCellRendererParams<ResponsibleInterface>> = {
    format: 'ellipsis',
    actions: [
      {
        icon: 'pi-icon pi-eye',
        label: 'Ver',
        callback: (row: ICellRendererParams<ResponsibleInterface>) => this.view(row),
      },
      {
        icon: 'pi-icon pi-pencil',
        label: 'Editar',
        callback: (row: ICellRendererParams<ResponsibleInterface>) => this.edit(row),
      },
      {
        icon: 'pi-icon pi-trash',
        label: 'Excluir',
        callback: (row: ICellRendererParams<ResponsibleInterface>) => this.delete(row),
        callbackConfirmationDialog: {},
      },
    ],
    width: 100
  };
  protected colDefs: ColDef[] = this.colDefByWindowSize();
  protected custom: TableCustomConfig<ResponsibleInterface> = {
    rowSelection: 'single',
  };
  ngOnInit() {
    this._layoutService.updateTitle('Registro de Responsável');
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
      { headerName: 'CPF', field: 'cpf', valueGetter: (params: ValueGetterParams<ResponsibleInterface>) => params.data?.meta?.cpf ?? 'Não Informado'},
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'phone', valueGetter: (params: ValueGetterParams<ResponsibleInterface>) => params.data?.meta?.phone ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
    return [
      { headerName: 'Nome', field: 'name' },
      { headerName: 'CPF', field: 'cpf', valueGetter: (params: ValueGetterParams<ResponsibleInterface>) => params.data?.meta?.cpf ?? 'Não Informado' },
      { headerName: 'Endereço', field: 'address', valueGetter: (params: ValueGetterParams<ResponsibleInterface>) => params.data?.meta?.address ?? 'Não Informado'},
      { headerName: 'Email', field: 'email' },
      { headerName: 'Celular', field: 'phone', valueGetter: (params: ValueGetterParams<ResponsibleInterface>) => params.data?.meta?.phone ?? 'Não Informado'},
      { headerName: 'Ações', field: 'action', cellRendererParams: this.cellRenderParams },
    ]
  }

  protected fetchRowData$(): void {
    this.rowData$ = this._registerResponsiblesService.findAll().pipe(
      map(apiResponse => {
        return apiResponse.data;
      })
    );
  }

  public edit(params: ICellRendererParams<ResponsibleInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id, 'edit'], { relativeTo: this._route });
    }
  }

  public view(params: ICellRendererParams<ResponsibleInterface>) {
    const id = params.data?.id;
    if (id) {
      this._router.navigate([id], { relativeTo: this._route });
    }
  }

  public delete(params: ICellRendererParams<ResponsibleInterface>) {
    const id = params.data?.id;
    if (id) {
      this._registerResponsiblesService.delete(id).subscribe({
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
