import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[appMonitoringValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MonitoringValidator,
      multi: true,
    }
  ]
})
export class MonitoringValidator implements Validator {
  validate(form: AbstractControl): ValidationErrors | null {
    const responsible_id = form.get('responsible_id')?.value;
    const responsible = form.get('responsible')?.value;
    const responsible_cpf = form.get('responsible_cpf')?.value;

    const INVALID =
      (!responsible_id && (!responsible && !responsible_cpf)) ||
      (!responsible_id && (!responsible && responsible_cpf)) ||
      (!responsible_id && (responsible && !responsible_cpf)) ||
      (responsible_id && (responsible || responsible_cpf));

    if(INVALID) return { responsibleError: true }
    return null;
  }
}
