import {Component, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {FloatLabel} from 'primeng/floatlabel';
import {Fluid} from 'primeng/fluid';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Select} from 'primeng/select';
import {FormBaseComponent} from '../../../../../core/components/form-base/form-base.component';
import {DocumentInterface, DocumentResponse} from '../../interfaces/docs.interface';
import {DocumentService} from '../../services/document.service';
import {StudentInterface} from '../../../register-student/interfaces/student.interface';
import {HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {ModalService} from '../../../../../core/services/overlays/modal.service';

@Component({
  selector: 'app-doc-update',
  imports: [
    Button,
    FileUpload,
    FloatLabel,
    Fluid,
    InputText,
    ReactiveFormsModule,
    Select,
  ],
  templateUrl: './doc-update.component.html',
  styleUrl: './doc-update.component.scss'
})
export class DocUpdateComponent extends FormBaseComponent<DocumentResponse> {

  private readonly _modalService: ModalService<unknown, { document: DocumentResponse, callback: () => void }> = inject(ModalService);

  protected data!: { document: DocumentResponse, callback: () => void };

  constructor(
    protected override _fb: FormBuilder,
    protected readonly _documentService: DocumentService,
  ){
    super(_fb, _documentService);
    this.data = this._modalService.getData();
    this._loadExistingFile();
  }

  protected registerStudents: StudentInterface[] = [];

  protected file?: File;
  protected files: File[] = [];
  protected percentage: number = 0;

  protected override buildForm() {
    this.form = this._fb.group({
      name: [null, [Validators.required]],
      file: [null, [Validators.required]],
      register_student_id: [null, [Validators.required]],
    });

    const students: StudentInterface[] = JSON.parse(this._authSessionService.getStudents() ?? '');
    if(students) this.registerStudents = students;

    if(this.data) {
      this.form.patchValue({
        name: this.data.document.name,
        file: null,
        register_student_id: this.data.document.register_student_id,
      });
    }
  }

  protected onUpload(event: FileUploadHandlerEvent): void {
    this.file = event.files[0];
    this.files = event.files;
  }

  protected onRemove() {
    this.file = undefined;
    this.files = [];
  }

  private _loadExistingFile(): void {
    this._documentService.getDocument(this.data.document).subscribe({
      next: (blob: any) => {
        this.file = new File([blob], this.data.document.original_name, {type: this.data.document.mime_type});
        this.files = [this.file];
      }
    })
  }

  protected override onSubmit() {
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
        name: this.form.get('name')?.value,
        file: this.file,
        register_student_id: this.form.get('register_student_id')?.value,
      }
      this._documentService.updateDocument(this.data.document, docData).subscribe({
        next: (event) => {
          if(event.type === HttpEventType.Sent) {
            this.toast.showToast('info', 'Salvando arquivos...')
          }
          if(event.type === HttpEventType.UploadProgress) {
            this.percentage = Math.round(100 * event.loaded / (event.total || 1));
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
    this.toast.clear();
    this.toast.showToast("success", 'Documento salvo com sucesso')
    this._modalService.closeDialog();
    this._router.navigate(['/docs'], {queryParams: {refresh: true}});
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
