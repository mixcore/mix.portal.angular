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
      {
        icon: 'format_list_numbered',
        title: 'Discount',
        url: CMS_ROUTES.portal.discount.fullPath,
      },
      {
        icon: 'format_list_numbered',
        title: 'Promotions',
        url: CMS_ROUTES.portal.promotion.fullPath,
      },
      {
        icon: 'inactive_order',
        title: 'Orders',
        url: CMS_ROUTES.portal.order.fullPath,
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
        title: 'Contexts',
        url: CMS_ROUTES.portal.databaseContext.fullPath,
      },
      {
        icon: 'format_list_numbered',
        title: 'Databases',
        url: CMS_ROUTES.portal.database.fullPath,
      },
      {
        icon: 'table_view',
        title: 'Query Data',
        url: CMS_ROUTES.portal.databaseQuery.fullPath,
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
    title: 'Projects',
    url: CMS_ROUTES.portal['database-data'].fullPath + '/mixTask',
    iconColor: '#3EAF12',
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
