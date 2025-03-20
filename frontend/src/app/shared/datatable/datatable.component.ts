import {Component, inject, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import type {ColDef, FilterChangedEvent, IRowNode, IsExternalFilterPresentParams} from 'ag-grid-community';
import {
  ModuleRegistry,
  AllCommunityModule,
  RowSelectionModule,
  RowSelectionOptions,
  FirstDataRenderedEvent,
  SelectionChangedEvent,
  GridReadyEvent,
  GridOptions,
  Theme,
  themeQuartz,
  colorSchemeDark,
} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {AsyncPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GridActionButtonsComponent} from './components/grid-action-buttons/grid-action-buttons.component';
import {AddCallbackFn, TableCustomConfig} from './datatable.interface';
import {ThemesService} from '../../core/services/themes/themes.service';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
// Register AG-Grid modules
ModuleRegistry.registerModules([AllCommunityModule, RowSelectionModule]);

@Component({
  selector: 'app-datatable',
  imports: [AgGridAngular, AsyncPipe, ReactiveFormsModule, FormsModule, Button, FloatLabel, InputText],
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})

export class DatatableComponent<DataType> implements OnInit {

  private readonly _theme: ThemesService = inject(ThemesService);

  ngOnInit(): void {
    this._theme.darkMode$.subscribe({
      next: (isDark) => {
        this.theme = isDark ? themeQuartz.withPart(colorSchemeDark) : (this.theme = themeQuartz);
      },
    });
    this.updatePaginationForScreenSize();
  }

  private _colDefs: ColDef[] = [];
  private _tableCustomConfig: TableCustomConfig<DataType> = {};
  private _addCallbackFn?: AddCallbackFn = undefined;

  @Input() hasHeader: boolean = true;

  @Input() rowData$: Observable<DataType[]> = of([]);

  @Input()
  set colDefs(colDefs: ColDef[]) {
    this._colDefs = colDefs.map((colDef) => {
      if (colDef.field === 'action') {
        colDef = {
          ...this.actionColumn,
          headerName: colDef.headerName,
          cellRendererParams: colDef.cellRendererParams,
          width: colDef.cellRendererParams.width
            ? colDef.cellRendererParams.width
            :(colDef.cellRendererParams.format === 'ellipsis'
              ? 70
              : 300),
        };
      }

      colDef.headerName = colDef?.headerName || '';

      return colDef;
    });
  }

  get colDefs(): ColDef[] {
    return this._colDefs;
  }

  @Input()
  set tableCustomConfig(config: TableCustomConfig<DataType>) {
    this._tableCustomConfig = config;
    if (config.rowSelection) {
      if (typeof config.rowSelection === 'object') {
        this.rowSelection = {...config.rowSelection};
      } else {
        this.rowSelection = config.rowSelection;
      }
    }
    if (config.pagination?.pageSize) {
      this.paginationPageSize = config.pagination.pageSize;
    }
    if (config.pagination?.pageSizeSelector) {
      this.paginationPageSizeSelector = config.pagination.pageSizeSelector;
    }
    if (config.callback?.onFirstDataRendered) {
      this.onFirstDataRendered = config.callback.onFirstDataRendered;
    }
    if (config.callback?.onSelectionChanged) {
      this.onSelectionChanged = config.callback.onSelectionChanged;
    }
    if (config.callback?.onGridReady) {
      this.onGridReady = config.callback.onGridReady;
    }
    if (config.callback?.doesExternalFilterPass) {
      this.doesExternalFilterPass = config.callback.doesExternalFilterPass;
    }
    if (config.callback?.isExternalFilterPresent) {
      this.isExternalFilterPresent = config.callback.isExternalFilterPresent;
    }
    if (config.callback?.onFilterChanged) {
      this.onFilterChanged = config.callback.onFilterChanged;
    }
  }

  get tableCustomConfig(): TableCustomConfig<DataType> {
    return this._tableCustomConfig;
  }

  @Input()
  set addCallbackFn(fn: AddCallbackFn | undefined) {
    this._addCallbackFn = fn ?? undefined;
  }

  get addCallbackFn(): AddCallbackFn | undefined {
    return this._addCallbackFn;
  }

  @Input() loading: boolean = false;

  protected theme!: Theme;
  protected selectedRows: DataType[] = [];
  protected quickSearch: string = '';
  protected gridOptions: GridOptions = {
    context: {
      componentParent: this,
    },
  };
  protected defaultColDef: ColDef = {
    filter: true,
  };
  protected actionColumn: ColDef = {
    headerName: 'Ações',
    field: 'actions',
    pinned: 'right',
    resizable: true,
    cellRenderer: GridActionButtonsComponent,
    filter: false,
    sortingOrder: [null],
  };
  protected rowSelection: RowSelectionOptions<DataType> | 'single' | 'multiple' = {
    mode: 'multiRow',
    groupSelects: 'descendants',
  };

  protected pagination: boolean = true;
  protected paginationPageSizeSelector: number[] | boolean = [10, 15, 30];
  protected paginationPageSize: number = 10;
  protected supressPaginationPanel: boolean = false;

  protected isExternalFilterPresent = (params: IsExternalFilterPresentParams<DataType>) => {
    if (this._tableCustomConfig.callback?.isExternalFilterPresent) {
      return this._tableCustomConfig.callback?.isExternalFilterPresent?.(params);
    }
    return false;
  };

  protected doesExternalFilterPass = (node: IRowNode<DataType>): boolean => {
    return this._tableCustomConfig.callback?.doesExternalFilterPass?.(node) as unknown as boolean;
  };

  /**
   * Callback triggered when a filter is changed.
   *
   * This function notifies the parent component by invoking the corresponding callback, if provided.
   *
   * @param event The filter change event, containing the updated filter state.
   */
  protected onFilterChanged(event: FilterChangedEvent<DataType>) {
    this._tableCustomConfig.callback?.onFilterChanged?.(event);
  }

  /**
   * Callback for when the data is first rendered.
   *
   * Can be substituted with the callback function from parent component.
   *
   * @param params The event of first data rendering in the table.
   */
  protected onFirstDataRendered(params: FirstDataRenderedEvent<DataType>) {
    params.api.paginationGoToPage(0); // Navigate to the first page after the first render
    this._tableCustomConfig.callback?.onFirstDataRendered?.(params); // Call the custom callback if defined
  }

  /**
   * Callback for when the row selection changes.
   *
   * Can be substituted with the callback function from parent component.
   *
   * @param params The event for row selection change.
   * @param selectedRows The rows that were selected.
   */
  protected onSelectionChanged(params: SelectionChangedEvent<DataType>, selectedRows: DataType[]) {
    this.selectedRows = selectedRows; // Update the selected rows
    this._tableCustomConfig.callback?.onSelectionChanged?.(params, selectedRows); // Call the custom callback if defined
  }

  /**
   * Callback for when the grid is ready and initialized.
   *
   * Can be substituted with the callback function from parent component.
   *
   * @param params The event of grid initialization.
   */
  protected onGridReady(params: GridReadyEvent<DataType>) {
    if (this._tableCustomConfig.callback?.onGridReady) {
      this._tableCustomConfig.callback?.onGridReady?.(params); // Call the custom callback if defined
    }
    params.api.setGridOption('domLayout', 'autoHeight'); // Adjust grid layout to auto height
    params.api.sizeColumnsToFit(); // Resize columns to fit the available space
  }

  /**
   * Function to add a new item, called when the user clicks the add button.
   *
   * Must be substituted with the callback function from parent component if
   * there is an addition action.
   */
  protected handleAdd = () => {
    this._addCallbackFn?.(); // Call the callback function if defined
  };

  private updatePaginationForScreenSize() {
    if(window.innerWidth < 768) {
      this.supressPaginationPanel = true;
      this.pagination = false;
    }
  }
}
