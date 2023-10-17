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
    title: 'Mix Dbs',
    url: CMS_ROUTES.portal.database.fullPath,
    icon: 'database',
    children: [
      {
        icon: 'format_list_numbered',
        title: 'Setting Database',
        url: CMS_ROUTES.portal.database.fullPath,
      },
      {
        icon: 'table_view',
        title: 'Query Data',
        url: CMS_ROUTES.portal['database-data'].fullPath,
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
