import {Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Button, ButtonDirective } from 'primeng/button';
import { ActionButtonParameters, CustomCellRendererParams } from './grid-action-buttons.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import {ConfirmationDialogService} from '../../../../core/services/overlays/confirmation-dialog.service';

@Component({
  selector: 'app-grid-action-buttons',
  imports: [ButtonDirective, TieredMenu, Button],
  templateUrl: './grid-action-buttons.component.html',
  styleUrl: './grid-action-buttons.component.scss',
})

export class GridActionButtonsComponent<DataType> implements ICellRendererAngularComp {

  constructor(
    private readonly _sanitizer: DomSanitizer,
    private readonly _confirmationDialogService: ConfirmationDialogService,
  ) {}

  protected params!: CustomCellRendererParams<DataType>;
  protected menuItems: MenuItem[] = [];

  public agInit(params: CustomCellRendererParams<DataType>): void {
    this.params = {
      ...params,
      actions: this._translateLabels(params.actions),
    };
    if (this.params.format === 'ellipsis') {
      this._transformToDropdown(this.params);
    }
  }

  public refresh(params: CustomCellRendererParams<DataType>): boolean {
    this.params = params;
    return true;
  }

  protected handleIcon(action: ActionButtonParameters<DataType>): SafeHtml | null {
    if (action.icon?.includes('pi-icon')) {
      const icon = action.icon.replace('pi-icon ', '');
      return this._sanitizer.bypassSecurityTrustHtml(`<i class="pi ${icon}"></i>`);
    }
    return action.icon ? this._sanitizer.bypassSecurityTrustHtml(action.icon) : null;
  }

  protected onClick(action: ActionButtonParameters<DataType>) {
    if (!action.callbackConfirmationDialog) {
      action.callback(this.params);
    }
    this.openConfirmationDialog(action);
  }

  protected openConfirmationDialog(action: ActionButtonParameters<DataType>): void {
    if (action.callbackConfirmationDialog) {
      this._confirmationDialogService.showConfirmationDialog(
        {
          ...action.callbackConfirmationDialog,
          acceptButtonProps: {
            callback: (action: ActionButtonParameters<DataType>) => action.callback(this.params),
          },
          rejectButtonProps: {
            callback: () => {
              this._confirmationDialogService.closeConfirmationDialog();
            },
          },
        },
        action,
      );
    }
  }

  private _translateLabels(actions: ActionButtonParameters<DataType>[]): ActionButtonParameters<DataType>[] {
    return actions.map((action: ActionButtonParameters<DataType>) => {
      if (action.label) {
        return {
          ...action,
          label: action.label,
        };
      }
      return action;
    });
  }

  private _transformToDropdown(params: CustomCellRendererParams<DataType>) {
    const actions = params.actions;
    actions.forEach((action: ActionButtonParameters<DataType>) => {
      this.menuItems.push({
        label: action.label,
        icon: action.icon?.includes('pi-icon') ? action.icon.replace('pi-icon', 'pi') : undefined,
        command: () => {
          if (action.callbackConfirmationDialog) {
            this.openConfirmationDialog(action);
          } else {
            action.callback(this.params);
          }
        },
      });
    });
  }
}
