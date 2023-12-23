import { MenuItem } from '@mixcore/lib/model';
import { CMS_ROUTES } from '../../app.routes';

export const APP_MENU = <MenuItem[]>[
  {
    title: 'Dashboard',
    url: CMS_ROUTES.portal.dashboard.fullPath,
    icon: 'dashboard',
    iconColor: '#00ACC1',
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
  {
    title: 'Posts',
    url: CMS_ROUTES.portal.post.fullPath,
    icon: 'post_add',
    iconColor: '#EC652C',
    children: [
      {
        icon: 'format_list_numbered',
        title: 'List',
        url: CMS_ROUTES.portal.post.fullPath,
      },
    ],
  },
  {
    title: 'Pages',
    url: CMS_ROUTES.portal.page.fullPath,
    icon: 'lab_profile',
    iconColor: '#2190E4',
    children: [
      {
        icon: 'format_list_numbered',
        title: 'List',
        url: CMS_ROUTES.portal.page.fullPath,
      },
    ],
  },
  {
    title: 'Modules',
    url: CMS_ROUTES.portal.module.fullPath,
    icon: 'view_module',
    iconColor: '#63D8FF',
    children: [
      {
        icon: 'format_list_numbered',
        title: 'List',
        url: CMS_ROUTES.portal.module.fullPath,
      },
    ],
  },
  {
    title: 'Mix Dbs',
    url: CMS_ROUTES.portal.database.fullPath,
    icon: 'database',
    iconColor: '#BB56CF',
    children: [
      {
        icon: 'content_copy',
        title: 'Context(s)',
        iconColor: '#BB56CF',
        url: CMS_ROUTES.portal.databaseContext.fullPath,
      },
      {
        icon: 'format_list_numbered',
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
        url: CMS_ROUTES.portal.databaseQuery.fullPath,
      },
      {
        icon: 'description',
        title: 'API Document',
        url: CMS_ROUTES.portal['database-doc'].fullPath,
      },
    ],
  },
  {
    title: 'User',
    url: CMS_ROUTES.portal.user.fullPath,
    icon: 'manage_accounts',
    children: [
      {
        title: 'All',
        url: CMS_ROUTES.portal.user.fullPath,
        icon: 'manage_accounts',
      },
      {
        title: 'Roles',
        url: CMS_ROUTES.portal.roles.fullPath,
        icon: 'security',
      },
      {
        title: 'Permissions',
        url: CMS_ROUTES.portal.permission.fullPath,
        icon: 'folder_managed',
      },
    ],
  },
  {
    title: 'Project',
    icon: 'view_kanban',
    iconColor: '#2190E4',
    children: [
      {
        title: 'Project Setting',
        url: CMS_ROUTES.portal.project.fullPath,
        icon: 'settings',
        align: 'bottom',
      },
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
  {
    title: 'Posts',
    url: CMS_ROUTES.portal.post.fullPath,
    icon: 'post_add',
    children: [
      {
        icon: 'format_list_numbered',
        title: 'List',
        url: CMS_ROUTES.portal.post.fullPath,
      },
      {
        icon: 'add_circle',
        title: 'Create',
        url: CMS_ROUTES.portal.post.fullPath,
      },
    ],
  },
];
