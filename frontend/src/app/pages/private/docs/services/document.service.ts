import { Injectable } from '@angular/core';
import {HttpBaseService} from '../../../../core/services/http/http-base.service';
import {Observable} from 'rxjs';
import {HttpEvent, HttpRequest} from '@angular/common/http';
import {DocumentInterface} from '../interfaces/docs.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends HttpBaseService<DocumentInterface>{
  protected override resource: string = 'docs';

  public uploadDocument(payload: DocumentInterface): Observable<HttpEvent<unknown>> {
    const formData: FormData = new FormData();
    formData.append('file', payload.file, payload.file.name);
    if(payload.register_student_id) formData.append('register_student_id', payload.register_student_id?.toString())
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
}
