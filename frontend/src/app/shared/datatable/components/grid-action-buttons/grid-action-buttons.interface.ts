import { ICellRendererParams } from 'ag-grid-community';
import {ConfirmationDialogConfig} from '../../../../core/interfaces/overlays/confirmation-dialog.interface';

export type ActionButtonLabels = keyof typeof ActionButtonLabels;

export type FormatParameters = keyof typeof FormatParameters;

export type SeverityParameters = keyof typeof SeverityParameters;
export interface CustomCellRendererParams<DataType> extends ICellRendererParams<DataType> {
  actions: ActionButtonParameters<DataType>[];
  format: FormatParameters;
  width: number;
}

export interface ActionButtonParameters<DataType> {
  label?: ActionButtonLabels | string;
  icon?: string;
  severity?: SeverityParameters | null | undefined;
  callback: (params: ICellRendererParams<DataType>) => void;
  callbackConfirmationDialog?: ConfirmationDialogConfig;
}

export const ActionButtonLabels = {
  edit: 'edit',
  delete: 'delete',
  view: 'view',
} as const;

export const FormatParameters = {
  ellipsis: 'ellipsis',
  buttons: 'buttons',
} as const;

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
