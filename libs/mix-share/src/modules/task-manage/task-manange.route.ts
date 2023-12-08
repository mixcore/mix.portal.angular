import { Routes } from '@angular/router';

export const taskManagementRoutes: Routes = [
  {
    path: 'board',
    loadComponent: () =>
      import('./board/board.component').then((c) => c.TaskBoardComponent),
  },
  {
    path: 'project',
    loadComponent: () =>
      import('./project/project.component').then((c) => c.ProjectComponent),
  },
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full',
  },
];
