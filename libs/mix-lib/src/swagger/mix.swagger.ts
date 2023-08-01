export const MixSwagger = {
  auth: {
    signIn: '/api/v2/rest/mix-account/user/login',
    register: '/api/v2/rest/mix-account/user/register',
    getProfile: '/api/v2/rest/mix-account/user/my-profile',
    culture: '/api/v2/rest/mix-portal/culture',
  },
  global: {
    globalSetting: '/api/v2/rest/shared/get-global-settings',
    dashboardInfo: '/api/v2/rest/mix-portal/common/en-US/dashboard',
  },
  content: {
    pageContent: '/api/v2/rest/mix-portal/mix-page-content',
    postContent: '/api/v2/rest/mix-portal/mix-post-content',
    moduleContent: '/api/v2/rest/mix-portal/mix-module-content',
    moduleData: '/api/v2/rest/mix-portal/mix-module-data',
    postToPost: '/api/v2/rest/mix-portal/mix-post-post',
    template: '/api/v2/rest/mix-portal/mix-template',
    database: '/api/v2/rest/mix-portal/mix-database',
    getDatabaseBySystemName: '/api/v2/rest/mix-portal/mix-database/get-by-name',
    mixDb: '/api/v2/rest/mix-portal/mix-db',
  },
  storage: {
    upload: '/api/v2/rest/mix-storage/upload-file',
    delete: '/api/v2/rest/mix-storage/delete-file',
  },
  service: {
    metadata: '/api/v2/rest/mix-services/metadata',
    getMetadata: '/api/v2/rest/mix-services/metadata/get-metadata',
    createMetadataAsc:
      '/api/v2/rest/mix-services/metadata/create-metadata-association',
    deleteMetadataAsc:
      '/api/v2/rest/mix-services/metadata/delete-metadata-association',
    sync: '/api/daphale/sync/products',
  },
  settings: {
    config: '/api/v2/rest/mix-portal/configuration',
  },
  user: {
    list: '/api/v2/rest/mix-account/user/list',
    detail: '/api/v2/rest/mix-account/user/details',
    register: '/api/v2/rest/mix-account/user/register',
    role: '/api/v2/rest/mix-account/role',
    permission: '/api/v2/rest/mix-services/permission',
  },
  ecommerce: {
    updateDeliveryCode: '/api/v2/ecommerce/update-delivery-code',
  },
};
