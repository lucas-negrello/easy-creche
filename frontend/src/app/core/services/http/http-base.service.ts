import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../interfaces/http/api-response.interface';

/**
 * HttpBaseService is an abstract class that provides common HTTP CRUD operations.
 *
 * ### How to Use:
 * 1. **Extend this Class:** Create a new service by extending HttpBaseService and
 *    implement the abstract property `resource` with the name of the endpoint.
 * 2. **Inject Dependencies:** The extending service will automatically have access to
 *    the HttpClient for performing HTTP requests.
 * 3. **Call the CRUD Methods:** Use the provided methods (findAll, findPaginated, findOne,
 *    create, update, and delete) to interact with your API.
 *
 * ### How It Works:
 * - The service constructs the API URL by combining a base URL (from your environment configuration)
 *   with the `resource` path defined in the derived class.
 * - Each method performs an HTTP request using Angular's HttpClient, and applies common
 *   operators such as `map` to process the response and `catchError` to handle errors.
 * - The handleError() method processes HTTP errors, formats a user-friendly error message,
 *   and returns an observable error.
 *
 * ### How to Override Methods:
 * - If your API requires additional logic, you can override any of the CRUD methods in your
 *   derived service. For instance, you might need to modify the create() method to include extra headers.
 *
 * ### Additional Considerations:
 * - Ensure that your environment configuration provides the correct API URL.
 * - The naming convention used for methods follows community standards and is self-explanatory.
 *
 * @template T The type of the resource managed by the service.
 *
 * @example
 * ```typescript
 * // Example: Creating a CompanyService by extending HttpBaseService
 *
 * @Injectable({
 *   providedIn: 'root',
 * })
 * export class CompanyService extends HttpBaseService<Company> {
 *   protected override resource: string = 'companies';
 *
 *   // You can now use the inherited methods:
 *   // this.findAll(), this.findOne(id), this.create(payload), etc.
 * }
 *
 * // In a component:
 * this.companyService.findAll().subscribe(companies => {
 *   console.log('List of companies:', companies);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export abstract class HttpBaseService<T> {
  /**
   * Defines the resource path (endpoint) that this service will interact with.
   * Derived classes must set this property (e.g., 'users', 'companies', etc.).
   */
  protected abstract resource: string;

  /**
   * Base API URL defined in the environment configuration.
   * The trailing slash (if any) is removed for consistent URL construction.
   */
  protected _apiUrl = environment.apiUrl;
  get apiUrl(): string {
    return this._apiUrl.replace(/\/$/, '');
  }
  set apiUrl(value: string) {
    this._apiUrl = value;
  }

  constructor(protected http: HttpClient) {}


  findAll(): Observable<ApiResponse<T[]>> {
    const url = `${this.apiUrl}/${this.resource}`;
    return this.http.get<ApiResponse<T[]>>(url).pipe(
      map((response) => response),
    );
  }

  findOne(id: number | string): Observable<ApiResponse<T>> {
    return this.http
      .get<ApiResponse<T>>(`${this.apiUrl}/${this.resource}/${id}`)
  }

  create(payload: Partial<T>): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}/${this.resource}`, payload)
  }

  update(id: number | string, payload: Partial<T>): Observable<ApiResponse<T>> {
    return this.http
      .put<ApiResponse<T>>(`${this.apiUrl}/${this.resource}/${id}`, payload)
  }

  delete(id: number | string): Observable<ApiResponse<null>> {
    return this.http
      .delete<ApiResponse<null>>(`${this.apiUrl}/${this.resource}/${id}`)
  }


}
