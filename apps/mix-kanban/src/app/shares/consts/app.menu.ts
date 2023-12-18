import { CMS_ROUTES } from '../../app.routes';

export const APP_MENU = [
  {
    title: 'Dashboard',
    url: CMS_ROUTES.portal.dashboard.fullPath,
    icon: 'dashboard',
    iconColor: '#EC652C',
    children: [
      {
        icon: 'analytics',
        title: 'Statistic',
        url: CMS_ROUTES.portal.dashboard.fullPath,
      },
    ],
  },
  {
    title: 'Project',
    icon: 'view_kanban',
    iconColor: '#2190E4',
    children: [
      {
        title: 'Backlogs',
        iconColor: '#BB56CF',
        url: CMS_ROUTES.portal.board.fullPath,
        icon: 'view_kanban',
      },
      {
        title: 'Board',
        iconColor: '#BB56CF',
        url: CMS_ROUTES.portal.board.fullPath,
        icon: 'view_kanban',
      },
      {
        title: 'Timeline',
        iconColor: '#3EAF12',
        url: CMS_ROUTES.portal.timeline.fullPath,
        icon: 'timeline',
      },
    ],
  },
  {
    title: 'Project Setting',
    url: CMS_ROUTES.portal.project.fullPath,
    icon: 'settings',
    align: 'bottom',
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
