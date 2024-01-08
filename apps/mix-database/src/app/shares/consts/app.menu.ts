import { MenuItem } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../../app.routes';

export const APP_MENU: MenuItem[] = [
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
    title: 'Database',
    url: '',
    iconColor: '#EC652C',
    icon: 'database',
    default: true,
    children: [
      {
        icon: 'format_list_numbered',
        title: 'Context',
        url: CMS_ROUTES.portal.databaseContext.fullPath,
        iconColor: '#BB56CF',
      },
      {
        icon: 'settings',
        title: 'Database Config',
        iconColor: '#2190E4',
        url: CMS_ROUTES.portal.database.fullPath,
      },
      {
        icon: 'table_view',
        title: 'Query Data',
        iconColor: '#00ACC1',
        url: CMS_ROUTES.portal.databaseQuery.fullPath,
      },
      {
        icon: 'database',
        title: 'Visualize Diagram',
        iconColor: '#EC652C',
        url: CMS_ROUTES.portal.database.fullPath,
        isDevelopment: true,
      },
      {
        icon: 'description',
        title: 'API Document',
        url: CMS_ROUTES.portal.dashboard.fullPath,
        isDevelopment: true,
      },
    ],
  },
  {
    title: 'Users',
    url: '',
    iconColor: '#C8A2C8',
    icon: 'group',
    children: [
      {
        icon: 'sort',
        title: 'All Users',
        url: CMS_ROUTES.portal.users.fullPath,
      },
      {
        icon: 'verified_user',
        title: 'Roles',
        iconColor: '#2190E4',
        url: CMS_ROUTES.portal.roles.fullPath,
      },
    ],
  },
  {
    title: 'Events',
    url: CMS_ROUTES.portal.events.fullPath,
    iconColor: '#22d3ee',
    icon: 'schedule_send',
    children: [
      {
        icon: 'sort',
        title: 'Schedulers',
        url: CMS_ROUTES.portal.schedulers.fullPath,
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
      {
        icon: 'breaking_news_alt_1',
        title: 'News',
        url: CMS_ROUTES.portal.news.fullPath,
      },
    ],
  },
];
