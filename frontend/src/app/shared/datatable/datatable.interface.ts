import {
  FilterChangedEvent,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IRowNode,
  IsExternalFilterPresentParams,
  RowSelectionOptions,
  SelectionChangedEvent,
} from 'ag-grid-community';

/**
 * Type definition for the callback function triggered when an item is added.
 */
export type AddCallbackFn = () => void;

/**
 * Type representing the possible options for row selection without checkboxes.
 */
export type NoRowCheckboxOptions = keyof typeof NoRowCheckboxOptions;

/**
 * Custom configuration options for the datatable component.
 *
 * @template DataType - The type of data handled by the datatable.
 */
export interface TableCustomConfig<DataType> {
  /**
   * Defines the row selection behavior in the grid.
   * Can be an object with detailed row selection settings or a predefined `NoRowCheckboxOptions` value.
   */
  rowSelection?: RowSelectionOptions<DataType> | NoRowCheckboxOptions | undefined;

  /**
   * Configuration options for pagination settings in the datatable.
   */
  pagination?: CustomPaginationConfig;

  /**
   * Custom callback functions triggered by various datatable events.
   */
  callback?: CustomCallbackConfig<DataType>;
}

/**
 * Defines the pagination settings available for the datatable.
 */
export interface CustomPaginationConfig {
  /**
   * Number of rows displayed per page.
   */
  pageSize?: number;

  /**
   * Options available for selecting the number of rows per page.
   */
  pageSizeSelector?: number[];
}

/**
 * Callback functions that can be defined to handle specific grid events.
 *
 * @template DataType - The type of data used in the datatable.
 */
export interface CustomCallbackConfig<DataType> {
  /**
   * Triggered when the first set of data is rendered in the grid.
   *
   * @param params - Event parameters containing grid details.
   */
  onFirstDataRendered?: (params: FirstDataRenderedEvent<DataType>) => void;

  /**
   * Triggered when row selection changes in the datatable.
   *
   * @param params - Event parameters containing grid details.
   * @param selectedRows - The list of currently selected rows.
   */
  onSelectionChanged?: (params: SelectionChangedEvent<DataType>, selectedRows: DataType[]) => void;

  /**
   * Triggered when the grid is fully initialized and ready for interaction.
   *
   * @param params - Event parameters containing grid details.
   */
  onGridReady?: (params: GridReadyEvent<DataType>) => void;

  /**
   * Determines whether an external filter is currently applied.
   *
   * @param params - Parameters containing grid details.
   * @returns `true` if an external filter is present, otherwise `false`.
   */
  isExternalFilterPresent?: (params: IsExternalFilterPresentParams<DataType>) => boolean;

  /**
   * Checks if a specific row passes the external filter criteria.
   *
   * @param node - The row node to evaluate.
   * @returns `true` if the row meets the filter criteria, otherwise `false`.
   */
  doesExternalFilterPass?: (node: IRowNode<DataType>) => boolean;

  /**
   * Triggered when the grid's filter settings change.
   *
   * @param event - Event containing filter change details.
   */
  onFilterChanged?: (event: FilterChangedEvent<DataType>) => void;
}

/**
 * Enum-like constant defining possible row selection modes without checkboxes.
 */
export const NoRowCheckboxOptions = {
  /**
   * Allows single-row selection without checkboxes.
   */
  single: 'single',

  /**
   * Allows multiple-row selection without checkboxes.
   */
  multiple: 'multiple',
} as const;
