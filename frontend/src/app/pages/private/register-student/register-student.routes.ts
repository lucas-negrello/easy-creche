import { Routes } from "@angular/router";

export const RegisterStudentRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./register-student.component')
      .then(c => c.RegisterStudentComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./components/register-student-form/register-student-form.component')
      .then(c => c.RegisterStudentFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/register-student-form/register-student-form.component')
      .then(c => c.RegisterStudentFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./components/register-student-form/register-student-form.component')
      .then(c => c.RegisterStudentFormComponent),
  },
];
