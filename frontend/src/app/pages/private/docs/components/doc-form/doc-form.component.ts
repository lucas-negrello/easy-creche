import {Component, inject} from '@angular/core';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {DocumentService} from '../../services/document.service';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DocumentInterface} from '../../interfaces/docs.interface';
import {RegisterStudentService} from '../../../register-student/services/register-student.service';
import {map, Observable, of} from 'rxjs';
import {StudentInterface} from '../../../register-student/interfaces/student.interface';
import {AsyncPipe} from '@angular/common';
import {Button} from 'primeng/button';
import {FloatLabel} from 'primeng/floatlabel';
import {Fluid} from 'primeng/fluid';
import {Select} from 'primeng/select';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-doc-form',
  imports: [
    FileUpload,
    AsyncPipe,
    Button,
    FloatLabel,
    Fluid,
    FormsModule,
    ReactiveFormsModule,
    Select
  ],
  templateUrl: './doc-form.component.html',
  styleUrl: './doc-form.component.scss'
})
export class DocFormComponent extends FormBaseComponent<DocumentInterface> {

  private readonly _registerStudentService: RegisterStudentService = inject(RegisterStudentService);

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _documentService: DocumentService,
  ){
    super(_fb, _documentService);
  }

  protected registerStudents$: Observable<StudentInterface[]> = of([]);

  protected file?: File;
  protected percentage: number = 0;

  protected override buildForm() {
    this.form = this._fb.group({
      file: [null, [Validators.required]],
      register_student_id: [null],
    });

    this.registerStudents$ = this._registerStudentService.findAll().pipe(
      map((response) => {
        if(response.data) return response.data;
        return [];
      })
    );
  }

  protected onUpload(event: FileUploadHandlerEvent): void {
    this.file = event.files[0];
  }

  protected override onSubmit() {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      this.navigateToParent();
    }
    if(this.file) this.form.get('file')?.setValue(this.file?.name);
    if(!this.file) this.form.get('file')?.reset();
    if (this.form.invalid) {
      for (let controlsKey in this.form.controls) {
        this.form.controls[controlsKey].markAsTouched();
        this.form.controls[controlsKey].markAsDirty();
      }
    }
    if(this.file) {
      const docData: DocumentInterface = {
        file: this.file,
        register_student_id: this.form.get('register_student_id')?.value,
      }
      this._documentService.uploadDocument(docData).subscribe({
        next: (event) => {
          console.log(event)
          if(event.type === HttpEventType.UploadProgress) {
            this.percentage = Math.round(100 * event.loaded / (event.total || 1));
            this.toast.showToast('info', 'Salvando documento...', `${this.percentage}%`);
          } else if (event.type === HttpEventType.Response) {
            this.percentage = 100;
            this.onSubmitSuccess();
          }
        },
        error: (error: HttpErrorResponse) => {
          this.onSubmitError(error);
        }
      });
    }
    else {
      this.validateAllFormFields(this.form);
    }
  }

  public override onSubmitSuccess() {
    this.toast.showToast("success", 'Documento salvo com sucesso')
    this.navigateToParent();
  }

  public override onSubmitError(error: HttpErrorResponse) {
    this.toast.showToast('error', 'Erro ao enviar documentos', 'Um erro ocorreu ao tentar enviar o documento. Por favor, verifique o documento e tente novamente')
  }

  protected defineLabel(): string {
    if (this._route.snapshot.routeConfig?.path === ':id') {
      return 'Retornar';
    }
    return 'Enviar';
  }
}
