import {Routes} from '@angular/router';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {AdminGuard} from '../../core/guards/route/admin.guard';
import {UserGuard} from '../../core/guards/route/user.guard';
import {ProfileGuard} from '../../core/guards/profile/profile.guard';


export const Private: Routes = [
  {
    path: '',
    canActivateChild: [ProfileGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'register-admin',
        canActivate: [AdminGuard],
        title: 'Registrar Administrador',
        loadChildren: () => import('./register-admin/register-admin.routes')
          .then(r => r.RegisterAdminRoutes),
      },
      {
        path: 'register-responsible',
        canActivate: [AdminGuard],
        title: 'Registrar Responsável',
        loadChildren: () => import('./register-responsible/register-responsible.routes')
          .then(r => r.RegisterResponsibleRoutes),
      },
      {
        path: 'register-student',
        canActivate: [AdminGuard],
        title: 'Registrar Estudante',
        loadChildren: () => import('./register-student/register-student.routes')
          .then(r => r.RegisterStudentRoutes),
      },
      {
        path: 'in-out-monitoring',
        title: 'Monitoramento',
        loadComponent: () => import('./in-out-monitoring/in-out-monitoring.component')
          .then(c => c.InOutMonitoringComponent),
      },
      {
        path: 'student-progress',
        title: 'Feedback dos Alunos',
        loadChildren: () => import('./student-progress/student-progress.routes')
          .then(r => r.StudentProgressRoutes),
      },
      {
        path: 'child-development',
        title: 'Registro de Desenvolvimento',
        loadChildren: () => import('./child-development/child-development.routes')
          .then(r => r.ChildDevelopmentRoutes),
      },
      {
        path: 'child-frequency',
        title: 'Controle de Frequência',
        loadComponent: () => import('./child-frequency/child-frequency.component')
          .then(c => c.ChildFrequencyComponent),
      },
      {
        path: 'docs',
        title: 'Documentos',
        loadChildren: () => import('./docs/docs.routes')
          .then(r => r.DocsRoutes),
      },
      {
        path: 'resources',
        title: 'Recursos e Materiais',
        loadComponent: () => import('./resources/resources.component')
          .then(c => c.ResourcesComponent),
      },
      {
        path: 'contribute',
        canActivate: [UserGuard],
        title: 'Contribua!',
        loadComponent: () => import('./contribute/contribute.component')
          .then(c => c.ContributeComponent),
      },
      {
        path: 'panic',
        title: 'Botão do Pânico',
        canActivate: [AdminGuard],
        loadComponent: () => import('./panic/panic.component')
          .then(c => c.PanicComponent),
      },
      {
        path: 'chats',
        title: 'Chat',
        loadComponent: () => import('./chat/chat.component')
          .then(c => c.ChatComponent),
      },
      {
        path: '',
        title: 'Agendamentos',
        loadChildren: () => import('./schedules/schedules.routes')
          .then(r => r.SchedulesRoutes),
      },
    ]
  }
]
