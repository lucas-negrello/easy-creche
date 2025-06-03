import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {ButtonDirective} from 'primeng/button';
import {BaseInjectionsComponent} from '../../../core/components/base-injections/base-injections.component';
import {ConfirmationDialogService} from '../../../core/services/overlays/confirmation-dialog.service';
import {ModalService} from '../../../core/services/overlays/modal.service';
import {PanicConfirmationComponent} from './components/panic-confirmation/panic-confirmation.component';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-panic',
  imports: [
    ButtonDirective,
    Card
  ],
  templateUrl: './panic.component.html',
  styleUrl: './panic.component.scss'
})
export class PanicComponent extends BaseInjectionsComponent {
  private readonly _confirmationDialogService: ConfirmationDialogService = inject(ConfirmationDialogService);
  private readonly _modalService: ModalService<any, any> = inject(ModalService);
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Botão do Pânico');
  }

  openConfirmationDialog() {
    this._confirmationDialogService.showConfirmationDialog({
      header: 'Botão do Pânico',
      message: 'Você tem certeza que deseja acionar o botão do pânico?',
      acceptButtonProps: {
        callback: () => this.openPasswordConfirmationDialog()
      },
      rejectButtonProps: {
        callback: () => this._confirmationDialogService.closeConfirmationDialog()
      },
      closable: true,
      closeOnScape: true
    })
  }

  openPasswordConfirmationDialog() {
    this._modalService.openDialog(PanicConfirmationComponent, {
      width: '30rem',
      height: 'auto',
      closable: true,
      closeOnEscape: true,
      header: 'Confirme sua Senha'
    })
  }
}
