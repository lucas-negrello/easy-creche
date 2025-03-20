import { OnInit, OnDestroy, Directive, inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiResponse } from '../../interfaces/http/api-response.interface';
import { HttpBaseService } from '../../services/http/http-base.service';
import { ActivatedRoute, Router } from '@angular/router';

@Directive()
export abstract class FormBaseComponent<T> implements OnInit, OnDestroy {
  /** The reactive form that will be built by derived components */
  form!: FormGroup;

  /**
   * Instance of the services used by this class and the implementor classes.
   * */
  protected readonly _route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly _router: Router = inject(Router);

  /**
   * A loading state for inhibit user of making some action when something is loading.
   * */
  protected loading: boolean = false;
  /**
   * A Subject that emits a value when the component is destroyed.
   * It is used to automatically unsubscribe from observables to prevent memory leaks.
   */
  protected destroy$ = new Subject<void>();

  /**
   * An optional identifier that indicates if the form is in edit mode.
   * If `id` is defined, the form will perform an update operation;
   * otherwise, it will perform a create operation.
   */
  protected id?: number | string;

  /**
   * The constructor injects the FormBuilder and an instance of HttpBaseService.
   * The HttpBaseService is used to perform API requests such as create or update.
   *
   * @param _fb - Angular FormBuilder service used to build the reactive form.
   * @param _httpService - An instance of a service that extends HttpBaseService<T>.
   */
  protected constructor(
    protected readonly _fb: FormBuilder,
    protected readonly _httpService: HttpBaseService<T>,
  ) {}

  /**
   * Angular lifecycle hook that is called after the component is initialized.
   * It calls the buildForm() method (to construct the FormGroup),
   * handleMethods() (to define what method will be used by the route)
   * and setupForm() (to set up subscriptions for form value changes).
   */
  ngOnInit(): void {
    this.buildForm();
    this.handleMethods();
    this.setupForm();
  }

  /**
   * Defines automaticaly by the route what is the method that will be used.
   * If the route params is `create`, it will use a create type form.
   * If the route params is `:id/edit`, it will use an edit type form, making
   * the patch of the data from the backend by the :id param.
   * If the route params is `:id`, it will use a view type form, making the
   * patch of the data from the backend by the :id param and making the form
   * readonly type.
   *
   * */
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

  /**
   * Makes a patch from values to edit or view a form.
   *
   * @param id - Is the id of the fetched data.
   * */
  protected patchFormValues(id: number | string): void {
    if (id) {
      this._httpService
        .findOne(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response: ApiResponse<T>) => {
            this.form.patchValue(response.data ?? {});
          },
          error: (error) => {
            this.navigateToParent(error);
          },
        });
    }
  }

  /**
   * Makes the form readonly type, disabling all the reactive input fields.
   * */
  protected disableForm(): void {
    this.form.disable();
  }

  /**
   * Abstract method that must be implemented by the derived component.
   * Use this method to build the form structure (FormGroup) with all necessary controls and validators.
   *
   * Example:
   * ```typescript
   * protected buildForm(): void {
   *   this.form = this.fb.group({
   *     name: ['', Validators.required],
   *     email: ['', [Validators.required, Validators.email]],
   *     // add other controls as needed
   *   });
   * }
   * ```
   */

  protected abstract buildForm(): void;

  /**
   * Sets up the form by subscribing to its valueChanges observable.
   * This is useful for implementing dynamic validations or updating UI based on form changes.
   *
   * This method can be overridden by derived components if additional setup is required.
   */
  protected setupForm(): void {
    if (this.form) {
      this.form.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values) => this.onFormValueChanged(values));
    }
  }

  /**
   * Called whenever the form's value changes.
   * Override this method to perform actions based on form changes, such as dynamic validation feedback.
   *
   * @param values - The current value of the form.
   *
   * Example:
   * ```typescript
   * protected onFormValueChanged(values: any): void {
   *   // Custom logic for handling form changes
   *   console.log('Form changed:', values);
   * }
   * ```
   */
  protected onFormValueChanged(values: any): void {}

  /**
   * Called when the form is submitted.
   * It first checks if the form is valid. If valid, it calls submitForm(); otherwise,
   * it marks all controls as touched to trigger validation messages.
   *
   * This method is typically bound to the form's (ngSubmit) event in the template.
   */
  onSubmit(): void {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      this.navigateToParent();
    }
    if (this.form.valid) {
      this.submitForm();
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  /**
   * Recursively marks all controls in the form as touched.
   * This helps to display validation errors for all fields after an unsuccessful submit attempt.
   *
   * @param formGroup - The FormGroup whose controls should be marked.
   */
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

  /**
   * Check the validation of the field, for taking some action.
   *
   * @param field - The field of the validation test.
   * */
  checkValidation(field: string): boolean {
    return !!((this.form.get(field)?.dirty || this.form.get(field)?.touched) && this.form.get(field)?.invalid);
  }

  /**
   * Defines a class for invalid input for PrimeNg library.
   *
   * @param field - The field of the error to be displayed.
   * */
  invalidInput(field: string): string {
    return this.checkValidation(field) ? 'ng-invalid ng-dirty' : '';
  }

  /**
   * Define the errors for some field, displaying a message for every type of error.
   *
   * @param field - The field of the error to be displayed.
   * */
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

  /**
   * Handles the form submission by determining whether to perform a create or update operation.
   * The default implementation uses the HttpBaseService to either create or update the record,
   * depending on whether an `id` is defined.
   *
   * Developers can override this method if custom submission logic is required.
   *
   * Default behavior:
   * - If `id` is defined, it calls httpService.update(id, payload).
   * - Otherwise, it calls httpService.create(payload).
   */
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

  /**
   * Callback method that is executed when the API call in submitForm() is successful.
   * Override this method to handle success actions (e.g., navigation, displaying a success message).
   *
   * @param response - The API response returned from the create or update operation.
   *
   * Example:
   * ```typescript
   * protected onSubmitSuccess(response: ApiResponse<T>): void {
   *   // Custom success handling
   *   console.log('Submission successful:', response);
   * }
   * ```
   */
  protected onSubmitSuccess(response: ApiResponse<T>): void {
    this.loading = false;
    this.navigateToParent(response);
  }

  /**
   * Callback method that is executed when the API call in submitForm() results in an error.
   * Override this method to handle error actions (e.g., displaying error messages or logging).
   *
   * @param error - The error object returned from the API.
   *
   * Example:
   * ```typescript
   * protected onSubmitError(error: any): void {
   *   // Custom error handling
   *   console.error('Submission error:', error);
   * }
   * ```
   */
  protected onSubmitError(error: any): void {
    this.loading = false;
  }

  /**
   * Used to navigate to parent route, passing or not some information,
   * that can be an error, a success, or some data.
   * @param extras - Any type of data that you want to pass by.
   * */

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

  /**
   * Angular lifecycle hook that is called when the component is destroyed.
   * It emits a value on the destroy$ subject to unsubscribe from all observables,
   * preventing memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
