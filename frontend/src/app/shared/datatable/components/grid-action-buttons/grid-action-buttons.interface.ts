import { ICellRendererParams } from 'ag-grid-community';
import {ConfirmationDialogConfig} from '../../../../core/interfaces/overlays/confirmation-dialog.interface';

/**
 * Type representing possible action button labels.
 */
export type ActionButtonLabels = keyof typeof ActionButtonLabels;

/**
 * Type representing possible format options for action buttons.
 */
export type FormatParameters = keyof typeof FormatParameters;

/**
 * Type representing possible severity levels for action buttons.
 */
export type SeverityParameters = keyof typeof SeverityParameters;

/**
 * Custom parameters for AG-Grid cell renderer.
 *
 * @template DataType - The type of the data used in the grid.
 */
export interface CustomCellRendererParams<DataType> extends ICellRendererParams<DataType> {
  /**
   * List of actions available in the cell.
   */
  actions: ActionButtonParameters<DataType>[];

  /**
   * Defines the format of the action buttons (e.g., ellipsis menu or inline buttons).
   */
  format: FormatParameters;

  /**
   * Defines the width of the action buttons column.
   */
  width: number;
}

/**
 * Defines the structure of an action button inside the AG-Grid cell.
 *
 * @template DataType - The type of the data used in the grid.
 */
export interface ActionButtonParameters<DataType> {
  /**
   * The label of the action button.
   */
  label?: ActionButtonLabels | string;

  /**
   * The icon class associated with the action button.
   */
  icon?: string;

  /**
   * The severity level of the action button (e.g., success, danger, primary).
   */
  severity?: SeverityParameters | null | undefined;

  /**
   * The callback function executed when the action button is clicked.
   *
   * @param params - The AG-Grid cell renderer parameters.
   */
  callback: (params: ICellRendererParams<DataType>) => void;

  callbackConfirmationDialog?: ConfirmationDialogConfig;
}

/**
 * Preset action button labels available in the grid.
 */
export const ActionButtonLabels = {
  edit: 'edit',
  delete: 'delete',
  view: 'view',
} as const;

/**
 * Available format options for action buttons.
 */
export const FormatParameters = {
  ellipsis: 'ellipsis', // Renders actions as a dropdown menu
  buttons: 'buttons', // Renders actions as inline buttons
} as const;

/**
 * Available severity levels for action buttons, defining their visual importance.
 */
export const SeverityParameters = {
  success: 'success',
  info: 'info',
  warn: 'warn',
  danger: 'danger',
  help: 'help',
  primary: 'primary',
  secondary: 'secondary',
  contrast: 'contrast',
} as const;
