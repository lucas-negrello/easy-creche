import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {environment} from '../../../../environments/environment';
import {QRCodeComponent} from 'angularx-qrcode';
import {ButtonDirective} from 'primeng/button';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-contribute',
  imports: [
    QRCodeComponent,
    ButtonDirective,
    Card
  ],
  templateUrl: './contribute.component.html',
  styleUrl: './contribute.component.scss'
})
export class ContributeComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  ngOnInit() {
    this._layoutService.updateTitle('Contribua!');
    this.gerarPayload();
    this.gerarCopiaCola();
  }

  protected pixKey: string = environment.pixKey;

  protected payloadComCRC: string = '';
  protected copyPasteCRC: string = '';

  protected qrCodePix(payload: string): string {
    let polinomio = 0x1021;
    let resultado = 0xFFFF;

    for (let i = 0; i < payload.length; i++) {
      resultado ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((resultado & 0x8000) !== 0) {
          resultado = (resultado << 1) ^ polinomio;
        } else {
          resultado <<= 1;
        }
      }
    }

    return (resultado & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }

  protected copyPastePix(payload: string): string {
    let polinomio = 0x1021;
    let resultado = 0xFFFF;

    for (let i = 0; i < payload.length; i++) {
      resultado ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        resultado = (resultado & 0x8000) ? (resultado << 1) ^ polinomio : resultado << 1;
      }
    }

    return (resultado & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }


  protected gerarPayload() {
    const chaveSemSimbolos = this.pixKey.replace(/[^+\d]/g, '');

    const merchantAccountInfo =
      '0014BR.GOV.BCB.PIX' +
      '01' + chaveSemSimbolos.length.toString().padStart(2, '0') + chaveSemSimbolos;

    const payloadSemCRC =
      '000201' +
      '26' + merchantAccountInfo.length.toString().padStart(2, '0') + merchantAccountInfo +
      '52040000' +
      '5303986' +
      '5802BR' +
      '62070503***' +
      '6304';

    const crc = this.qrCodePix(payloadSemCRC);
    this.payloadComCRC = payloadSemCRC + crc;
  }

  protected gerarCopiaCola() {
    const chave = this.pixKey.replace(/[^+\d]/g, '');
    const gui = 'BR.GOV.BCB.PIX';

    const merchantAccountInfo = '0014' + gui + '01' + chave.length.toString().padStart(2, '0') + chave;
    const payloadSemCRC =
      '000201' +
      '26' + merchantAccountInfo.length.toString().padStart(2, '0') + merchantAccountInfo +
      '52040000' +
      '5303986' +
      '5802BR' +
      '62070503***' +
      '6304';

    const crc = this.copyPastePix(payloadSemCRC);
    this.copyPasteCRC = payloadSemCRC + crc;
  }

  protected copiar() {
    navigator.clipboard.writeText(this.copyPasteCRC);
  }


}
