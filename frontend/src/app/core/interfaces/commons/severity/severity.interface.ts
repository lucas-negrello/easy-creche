export type SeverityType = keyof typeof Severity;

export const Severity = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  secondary: 'secondary',
  contrast: 'contrast',
} as const;
