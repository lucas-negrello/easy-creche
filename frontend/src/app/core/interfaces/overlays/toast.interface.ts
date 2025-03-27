import {Severity} from '../commons/severity/severity.interface';

export type ToastType = keyof typeof ToastType;

export const ToastType = Severity;
