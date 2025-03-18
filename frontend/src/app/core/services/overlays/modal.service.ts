import {inject, Injectable, Type} from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService<ComponentType, DataType> {

  private readonly _dialogService: DialogService = inject(DialogService);
  protected ref!: DynamicDialogRef;

  public openDialog(component: Type<ComponentType>, config?: DynamicDialogConfig): void {
    this.ref = this._dialogService.open(component, {...config});
  }

  public closeDialog(): void {
    this.ref.close();
  }

  public getData(): DataType {
    return this._dialogService.getInstance(this.ref).data;
  }
}
