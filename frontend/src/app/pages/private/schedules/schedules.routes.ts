import { Routes } from "@angular/router";

export const SchedulesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./schedules.component')
      .then(c => c.SchedulesComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./components/schedules-form/schedules-form.component')
      .then(c => c.SchedulesFormComponent),
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/schedules-form/schedules-form.component')
      .then(c => c.SchedulesFormComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./components/schedules-form/schedules-form.component')
      .then(c => c.SchedulesFormComponent),
  },
];
