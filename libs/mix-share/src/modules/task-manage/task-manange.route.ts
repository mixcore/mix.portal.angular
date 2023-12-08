import { Routes } from '@angular/router';
import { TaskManageLayoutComponent } from './task-manage.layout';

export const taskManagementRoutes: Routes = [
  {
    path: '',
    component: TaskManageLayoutComponent,
    children: [
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
    ],
  },
];
