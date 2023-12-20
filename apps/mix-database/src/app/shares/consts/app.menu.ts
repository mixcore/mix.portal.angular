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
