import { CMS_ROUTES } from '../../app.routes';

export const APP_MENU = [
  {
    title: 'Dashboard',
    url: CMS_ROUTES.portal.dashboard.fullPath,
    icon: 'dashboard',
    children: [
      {
        icon: 'analytics',
        title: 'Statistic',
        url: CMS_ROUTES.portal.dashboard.fullPath,
      },
    ],
  },
  {
    title: 'Projects',
    icon: 'view_kanban',
    children: [
      {
        title: 'Kanban',
        url: CMS_ROUTES.portal.task.fullPath,
        icon: 'view_kanban',
      },
    ],
  },
];

export const APP_NOT_SUPPER_ADMIN_MENU = [
  {
    title: 'Dashboard',
    url: CMS_ROUTES.portal.dashboard.fullPath,
    icon: 'empty_dashboard',
    children: [
      {
        icon: 'analytics',
        title: 'Statistic',
        url: CMS_ROUTES.portal.dashboard.fullPath,
      },
    ],
  },
];
