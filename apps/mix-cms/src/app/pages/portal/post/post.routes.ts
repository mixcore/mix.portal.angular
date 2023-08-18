import { Routes } from '@angular/router';
import { breadcrumbName } from '../../../app.routes';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./post.component').then((m) => m.PostPageComponent),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
    data: breadcrumbName('Detail'),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./post-detail/post-detail.component').then(
        (m) => m.PostDetailComponent
      ),
    data: breadcrumbName('Create'),
  },
];
