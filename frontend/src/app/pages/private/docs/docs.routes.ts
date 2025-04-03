import { Routes } from "@angular/router";

export const DocsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./docs.component')
      .then(c => c.DocsComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./components/doc-form/doc-form.component')
      .then(c => c.DocFormComponent),
  },
];
