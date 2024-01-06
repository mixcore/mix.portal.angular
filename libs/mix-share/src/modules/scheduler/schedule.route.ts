import { Routes } from '@angular/router';

export const SchedulerRoute: Routes = [
  {
    path: 'schedulers',
    loadComponent: () =>
      import('./schedulers/schedulers.component').then(
        (c) => c.SchedulersComponent
      ),
  },
  {
    path: '',
    redirectTo: 'schedulers',
    pathMatch: 'full',
  },
];
