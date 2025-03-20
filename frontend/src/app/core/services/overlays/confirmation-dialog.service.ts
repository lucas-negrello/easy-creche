import {inject, Injectable} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import {ConfirmationDialogConfig} from '../../interfaces/overlays/confirmation-dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  private _confirmationService = inject(ConfirmationService);

  public showConfirmationDialog(config: ConfirmationDialogConfig, extras?: any): void {
    const defaultMessage = 'Tem certeza que deseja continuar?';
    const defaultHeader = 'Confirmação';

    this._confirmationService.confirm({
      message:
        config?.message && config.message.trim() ? config.message : defaultMessage,
      header:
        config?.header && config.header.trim() ? config.header : defaultHeader,
      closable: config?.closable ?? true,
      closeOnEscape: config?.closeOnScape ?? true,
      icon: config?.icon,
      rejectButtonProps: {
        label:
          config?.rejectButtonProps?.label && config?.rejectButtonProps.label.trim()
            ? config.rejectButtonProps.label
            : 'Cancelar',
        severity: config?.rejectButtonProps?.severity ?? 'secondary',
        outlined: config?.rejectButtonProps?.outlined ?? true,
      },
      acceptButtonProps: {
        label:
          config?.acceptButtonProps?.label && config?.acceptButtonProps.label.trim()
            ? config.acceptButtonProps.label
            : 'Aceitar',
        severity: config?.acceptButtonProps?.severity ?? 'warn',
        outlined: config?.acceptButtonProps?.outlined,
      },
      accept: () => {
        if (config?.acceptButtonProps?.callback) {
          config?.acceptButtonProps.callback(extras);
        }
      },
      reject: () => () => {
        if (config?.rejectButtonProps?.callback) {
          config?.rejectButtonProps.callback(extras);
        }
      },
    });
  }

  public closeConfirmationDialog(): void {
    this._confirmationService.close();
  }
}
