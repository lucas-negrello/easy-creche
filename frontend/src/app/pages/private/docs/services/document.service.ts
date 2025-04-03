import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {Observable} from 'rxjs';
import {HttpEvent, HttpRequest} from '@angular/common/http';
import {DocumentInterface, DocumentResponse} from '../interfaces/docs.interface';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends HttpBaseService<DocumentResponse>{
  protected override resource: string = 'docs';

  protected storageUrl: string = environment.baseUrl;

  public uploadDocument(payload: DocumentInterface): Observable<HttpEvent<unknown>> {
    const formData: FormData = new FormData();
    formData.append('file', payload.file, payload.file.name);
    formData.append('register_student_id', payload.register_student_id.toString());
    formData.append('name', payload.name.toString());
    const req = new HttpRequest(
      'POST',
      `${this.apiUrl}/${this.resource}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      }
    );
    return this.http.request(req);
  }

  public downloadDocument(_document: DocumentResponse): void {
    const id = _document.id;
    const fileName = _document.original_name;
    this.http.get(`${this.apiUrl}/${this.resource}/${id}`, {responseType: 'blob'}).subscribe({
      next: (response: any) => {
        const blob = new Blob([response], {type: response.mime_type});
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    });
  }

  public updateDocument(document: DocumentResponse, payload: DocumentInterface): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', payload.file, payload.file.name);
    formData.append('register_student_id', payload.register_student_id.toString());
    formData.append('name', payload.name.toString());
    const req = new HttpRequest(
      'POST',
      `${this.apiUrl}/${this.resource}/${document.id}`,
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      }
    );
    return this.http.request(req);
  }

  public getDocument(_document: DocumentResponse): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.resource}/${_document.id}`, {responseType: 'blob'})
  }
}
