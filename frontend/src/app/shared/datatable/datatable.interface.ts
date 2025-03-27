import {
  FilterChangedEvent,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IRowNode,
  IsExternalFilterPresentParams,
  RowSelectionOptions,
  SelectionChangedEvent,
} from 'ag-grid-community';

export type AddCallbackFn = () => void;

export type NoRowCheckboxOptions = keyof typeof NoRowCheckboxOptions;

export interface TableCustomConfig<DataType> {
  rowSelection?: RowSelectionOptions<DataType> | NoRowCheckboxOptions | undefined;
  pagination?: CustomPaginationConfig;
  callback?: CustomCallbackConfig<DataType>;
}

export interface CustomPaginationConfig {
  pageSize?: number;
  pageSizeSelector?: number[];
}

export interface CustomCallbackConfig<DataType> {
  onFirstDataRendered?: (params: FirstDataRenderedEvent<DataType>) => void;
  onSelectionChanged?: (params: SelectionChangedEvent<DataType>, selectedRows: DataType[]) => void;
  onGridReady?: (params: GridReadyEvent<DataType>) => void;
  isExternalFilterPresent?: (params: IsExternalFilterPresentParams<DataType>) => boolean;
  doesExternalFilterPass?: (node: IRowNode<DataType>) => boolean;
  onFilterChanged?: (event: FilterChangedEvent<DataType>) => void;
}

export const NoRowCheckboxOptions = {
  single: 'single',
  multiple: 'multiple',
} as const;
