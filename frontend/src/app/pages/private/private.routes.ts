import {Routes} from '@angular/router';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {
  RegisterAdminFormComponent
} from './register-admin/components/register-admin-form/register-admin-form.component';

export const Private: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Agendamentos',
        loadComponent: () => import('./schedules/schedules.component')
          .then(c => c.SchedulesComponent),
      },
      {
        path: 'register-admin',
        title: 'Registrar Administrador',
        loadChildren: () => import('./register-admin/register-admin.routes')
          .then(r => r.RegisterAdminRoutes),
      },
      {
        path: 'register-responsible',
        title: 'Registrar Responsável',
        loadComponent: () => import('./register-responsible/register-responsible.component')
          .then(c => c.RegisterResponsibleComponent),
      },
      {
        path: 'register-student',
        title: 'Registrar Estudante',
        loadComponent: () => import('./register-student/register-student.component')
          .then(c => c.RegisterStudentComponent),
      },
      {
        path: 'in-out-monitoring',
        title: 'Monitoramento',
        loadComponent: () => import('./in-out-monitoring/in-out-monitoring.component')
          .then(c => c.InOutMonitoringComponent),
      },
      {
        path: 'student-progress',
        title: 'Registro de Desenvolvimento',
        loadComponent: () => import('./student-progress/student-progress.component')
          .then(c => c.StudentProgressComponent),
      },
      {
        path: 'docs',
        title: 'Documentos',
        loadComponent: () => import('./docs/docs.component')
          .then(c => c.DocsComponent),
      },
      {
        path: 'resources',
        title: 'Recursos e Materiais',
        loadComponent: () => import('./resources/resources.component')
          .then(c => c.ResourcesComponent),
      },
      {
        path: 'contribute',
        title: 'Contribua!',
        loadComponent: () => import('./contribute/contribute.component')
          .then(c => c.ContributeComponent),
      },
      {
        path: 'panic',
        title: 'Botão do Pânico',
        loadComponent: () => import('./panic/panic.component')
          .then(c => c.PanicComponent),
      }
    ]
  }
]
