import { Routes } from "@angular/router";
import {AdminGuard} from '../../../core/guards/route/admin.guard';

export const StudentProgressRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./student-progress.component')
      .then(c => c.StudentProgressComponent),
  },
  {
    path: 'create',
    canActivate: [AdminGuard],
    loadComponent: () => import('./components/student-progress-form/student-progress-form.component')
      .then(c => c.StudentProgressFormComponent),
  },
  {
    path: ':id/edit',
    canActivate: [AdminGuard],
    loadComponent: () => import('./components/student-progress-form/student-progress-form.component')
      .then(c => c.StudentProgressFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./components/student-progress-form/student-progress-form.component')
      .then(c => c.StudentProgressFormComponent),
  },
];
