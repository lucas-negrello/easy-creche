import {Component, inject} from '@angular/core';
import {LayoutService} from '../../../core/services/layout/layout.service';
import {Card} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {DocumentService} from './services/document.service';
import {DocumentResponse} from './interfaces/docs.interface';
import {BaseInjectionsComponent} from '../../../core/components/base-injections/base-injections.component';
import {ButtonGroup} from 'primeng/buttongroup';
import {ModalService} from '../../../core/services/overlays/modal.service';
import {DocUpdateComponent} from './components/doc-update/doc-update.component';
import {RouterLink} from '@angular/router';
import {ConfirmationDialogService} from '../../../core/services/overlays/confirmation-dialog.service';
import {Select} from 'primeng/select';
import {RegisterStudentService} from '../register-student/services/register-student.service';
import {StudentInterface} from '../register-student/interfaces/student.interface';
import {FormsModule} from '@angular/forms';
import {UserInterface} from '../../../core/interfaces/user/user.interface';

@Component({
  selector: 'app-docs',
  imports: [
    Card,
    TableModule,
    Button,
    ButtonGroup,
    RouterLink,
    Select,
    FormsModule
  ],
  templateUrl: './docs.component.html',
  styleUrl: './docs.component.scss'
})
export class DocsComponent extends BaseInjectionsComponent {
  private readonly _layoutService: LayoutService = inject(LayoutService);
  private readonly _documentsService: DocumentService = inject(DocumentService);
  private readonly _modalService: ModalService<DocUpdateComponent, { document: DocumentResponse, callback: () => void }> = inject(ModalService);
  private readonly _confirmationService: ConfirmationDialogService = inject(ConfirmationDialogService);

  protected documents: DocumentResponse[] = [];
  protected students: StudentInterface[] = [];
  protected selectedStudent!: number;

  ngOnInit() {
    const students = JSON.parse(this._authSessionService.getStudents() ?? '{}') as StudentInterface[];
    if(students) this.students = students;
    this.selectedStudent = this.students[0].id as number;
    this._layoutService.updateTitle('Documentos');
    this._fetchDocuments();
    this._route.queryParams.subscribe(params => {
      if(params['refresh']) this._fetchDocuments();
    })
  }

  protected refreshTable(): void {
    this._fetchDocuments();
  }

  protected downloadDocument(document: DocumentResponse): void {
    this._documentsService.downloadDocument(document);
  }

  protected editDocument(document: DocumentResponse): void {
    this._router.navigate(['/docs']);
    this._modalService.openDialog(DocUpdateComponent, {
      width: '80vw',
      height: '80vh',
      modal: true,
      closable: true,
      maximizable: false,
      appendTo: 'body',
      header: 'Atualizar documento',
      data: {
        document,
        callback: this._fetchDocuments
      }
    })
  }

  protected deleteDocument(document: DocumentResponse): void {
    this._confirmationService.showConfirmationDialog({
      closable: true,
      header: 'Apagar Documento',
      message: 'Deseja realmente apagar este documento?',
      closeOnScape: true,
      acceptButtonProps: {
        icon: 'pi-icon pi pi-trash',
        label: 'Deletar',
        severity: 'danger',
        callback: () => this._deleteConfirmed(document)
      },
      rejectButtonProps: {
        icon: 'pi pi-icon pi-close',
        label: 'Cancelar',
        severity: 'primary',
        callback: this._confirmationService.closeConfirmationDialog
      }
    })
  }

  private _deleteConfirmed(document: DocumentResponse): void {
    if(document.id) this._documentsService.delete(document.id).subscribe({
      next: () => {
        this.toast.showToast('success', 'Documento excluído com sucesso');
        this._fetchDocuments();
      },
      error: () => {
        this.toast.showToast('error', 'Ocorreu um erro ao excluir documento');
      }
    });
  }

  private _fetchDocuments(): void {
    this._documentsService.findAll().subscribe({
      next: (results) => {
        if (results.data) {
          this.documents = results.data.filter((doc: DocumentResponse) => doc.register_student_id === this.selectedStudent);
        }
      }
    });
  }

}
