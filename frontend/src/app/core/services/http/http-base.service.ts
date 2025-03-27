import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {catchError, map, Observable, ObservableInput, of, throwError} from 'rxjs';
import { ApiResponse } from '../../interfaces/http/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpBaseService<T> {

  protected abstract resource: string;

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
      catchError((error): Observable<ApiResponse<T[]>> => {
        return of({success: false, message: 'Erro ao listar recursos', data: error, status_code: 404});
      }),
    );
  }

  findOne(id: number | string): Observable<ApiResponse<T>> {
    return this.http
      .get<ApiResponse<T>>(`${this.apiUrl}/${this.resource}/${id}`).pipe(
        catchError((error): Observable<ApiResponse<T>> => {
          return of({success: false, message: 'Erro ao buscar recurso', data: error, status_code: 404});
        }),
      );
  }

  create(payload: Partial<T>): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(`${this.apiUrl}/${this.resource}`, payload).pipe(
        catchError((error): Observable<ApiResponse<T>> => {
          return of({success: false, message: 'Erro ao criar recurso', data: error, status_code: 400});
        }),
      );
  }

  update(id: number | string, payload: Partial<T>): Observable<ApiResponse<T>> {
    return this.http
      .put<ApiResponse<T>>(`${this.apiUrl}/${this.resource}/${id}`, payload).pipe(
        catchError((error): Observable<ApiResponse<T>> => {
          return of({success: false, message: 'Erro ao editar recurso', data: error, status_code: 400});
        }),
      );
  }

  delete(id: number | string): Observable<ApiResponse<null>> {
    return this.http
      .delete<ApiResponse<null>>(`${this.apiUrl}/${this.resource}/${id}`, {}).pipe(
        catchError((error): Observable<ApiResponse<null>> => {
          return of({ success: false, message: 'Erro ao excluir recurso', data: error, status_code: 400 });
        }),
      );
  }

}
