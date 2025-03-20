import {SeverityParameters} from '../../../shared/datatable/components/grid-action-buttons/grid-action-buttons.interface';

export interface ConfirmationDialogConfig {
  message?: string;
  header?: string;
  closable?: boolean;
  closeOnScape?: boolean;
  icon?: string;
  rejectButtonProps?: ButtonProps;
  acceptButtonProps?: ButtonProps;
}

export interface ButtonProps {
  label?: string;
  icon?: string;
  severity?: SeverityParameters | null | undefined;
  outlined?: boolean;
  callback: (event: any) => void;
}
