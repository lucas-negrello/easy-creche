import {inject, Injectable } from '@angular/core';
import {MessageService, ToastMessageOptions} from 'primeng/api';
import {ToastType} from '../../interfaces/overlays/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _messageService: MessageService = inject(MessageService);

  public showCustomToast(toastMessageOptions: ToastMessageOptions): void {
    this._messageService.add(toastMessageOptions);
  }

  public showToast(type: ToastType, title: string, message: string | null = '', duration: number = 1500) {
    this._showToastBySeverity(title, message ?? '', duration, type);
  }

  public clear(): void {
    this._messageService.clear();
  }

  private _showToastBySeverity(title: string, message: string, duration: number, severity: ToastType): void {
    this._messageService.add({
      summary: title,
      detail: message,
      life: duration,
      severity: severity,
      closable: true,
    });
  }
}
