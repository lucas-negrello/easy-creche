import {OnInit, OnDestroy, Directive, inject, AfterViewInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiResponse } from '../../interfaces/http/api-response.interface';
import { HttpBaseService } from '../../services/http/http-base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Directive()
export abstract class FormBaseComponent<T> implements OnInit, AfterViewInit, OnDestroy {

  public form!: FormGroup;

  protected readonly _route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly _router: Router = inject(Router);

  protected loading: boolean = false;
  protected id?: number | string;

  protected destroy$ = new Subject<void>();

  protected constructor(
    protected readonly _fb: FormBuilder,
    protected readonly _httpService: HttpBaseService<T>,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit(): void {
    this.handleMethods();
    this.setupForm();
  }

  protected handleMethods() {
    if (this._route.snapshot.routeConfig?.path === ':id/edit') {
      this.id = this._route.snapshot.params['id'];
      this.patchFormValues(this.id ?? '');
    }
    if (this._route.snapshot.routeConfig?.path === 'create') {
      this.id = undefined;
    }
    if (this._route.snapshot.routeConfig?.path === ':id') {
      const id = this._route.snapshot.params['id'];
      this.patchFormValues(id);
      this.disableForm();
    }
  }

  protected patchFormValues(id: number | string): void {
    if (id) {
      this._httpService
        .findOne(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<T>) => {
            this.form.patchValue(response.data ?? {});
            const inputs = document.querySelectorAll("p-inputmask");
            inputs.forEach(input => {
              if(input.querySelector('input')?.value) {
                input.querySelector('input')?.classList.add('p-filled');
              }
            });
          },
          error: (error) => {
            this.navigateToParent(error);
          },
        });
    }
  }

  protected disableForm(): void {
    this.form.disable();
  }

  protected abstract buildForm(): void;

  protected setupForm(): void {
    if (this.form) {
      this.form.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values) => this.onFormValueChanged(values));
    }
  }

  protected onFormValueChanged(values: any): void {}

  protected onSubmit(): void {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      this.navigateToParent();
    }
    if (this.form.valid) {
      this.submitForm();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  protected validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control?.markAsTouched({ onlySelf: true });
        control?.updateValueAndValidity();
      }
    });
  }

  checkValidation(field: string): boolean {
    return !!((this.form.get(field)?.dirty || this.form.get(field)?.touched) && this.form.get(field)?.invalid);
  }

  checkFromValidation(): boolean {
    return ((this.form.dirty || this.form.touched) && this.form.invalid);
  }

  invalidInput(field: string): string {
    return this.checkValidation(field) ? 'ng-invalid ng-dirty' : '';
  }

  returnErrors(field: string): any {
    let msg: null | string = null;
    Object.keys(this.form.get(field)?.errors || []).forEach((error, t, v) => {
      switch (error) {
        case 'required':
          msg = 'Este campo é obrigatório'
          break;
        case 'email':
          msg = 'Digite um email válido'
          break;
        case 'minlength':
          msg = 'Quantidade mínima de caracteres não atingida'
          break;
        default:
          msg = 'Campo inválido'
          break;
      }
    });
    if (msg) {
      return msg;
    }
    return;
  }

  returnFormErrors(): any {
    let msg: null | string = null;
    Object.keys(this.form.errors || []).forEach((error) => {
      switch (error) {
        case 'passwordMismatch':
          msg = 'Senhas não combinam';
          break;
        default:
          msg = 'Formulário inválido';
          break;
      }
    });
    if (msg) {
      return msg;
    }
    return;
  }

  protected submitForm(): void {
    this.loading = true;
    const payload = this.form.value;
    if (this.id) {
      this._httpService
        .update(this.id, payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<T>) => {
            this.onSubmitSuccess(response);
          },
          error: (error) => {
            this.onSubmitError(error);
          },
        });
    } else {
      this._httpService
        .create(payload)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<T>) => {
            this.onSubmitSuccess(response);
          },
          error: (error) => {
            this.onSubmitError(error);
          },
        });
    }
  }

  protected onSubmitSuccess(response: ApiResponse<T>): void {
    this.loading = false;
    this.navigateToParent(response);
  }

  protected onSubmitError(error: any): void {
    this.loading = false;
  }

  protected navigateToParent(extras: any = null) {
    const routePath = this._route.snapshot.routeConfig?.path;
    if (routePath?.includes('edit')) {
      this._router.navigate(['../../'], {
        relativeTo: this._route,
        state: { extras: extras },
        queryParams: { refresh: true },
      });
      return;
    }
    this._router.navigate(['../'], {
      relativeTo: this._route,
      state: { extras: extras },
      queryParams: { refresh: true },
    });
  }

  protected navigateTo(route: string) {
    this._router.navigate([route]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
