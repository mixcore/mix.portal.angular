import { Injectable } from '@angular/core';
import {
  GetTemplatesRequest,
  MixApplication,
  MixModule,
  MixPage,
  MixPermission,
  MixSettings,
  MixTemplate,
} from '@mixcore/lib/model';
import { MixSwagger } from '@mixcore/lib/swagger';
import { DashboardApiService } from './dashboard-api.service';
import { MixDatabaseApi } from './database-api.service';
import { MetadataService } from './metadata-api.service';
import { MixAccountApi } from './mix-account-api';
import { MixRestfulApi } from './mix-crud-api.service';
import { MixeCommerce } from './mix-ecommerce-api.service';
import { MixModuleDataApi } from './mix-module-data-api.service';
import { MixPostApi } from './mix-post-api.service';
import { MixPostToPostApi } from './mix-post-post-api.service';
import { MixSyncApi } from './mix-sync-api.service';
import { UploadApiService } from './upload-api.service';

@Injectable({ providedIn: 'root' })
export class MixApiFacadeService {
  // REST API
  public postApi = new MixPostApi(MixSwagger.content.postContent, {
    requestSuccessMsg: 'Successfully save your post',
  });

  public pageApi = new MixRestfulApi<MixPage>(MixSwagger.content.pageContent, {
    requestSuccessMsg: 'Successfully save your page',
  });

  public applicationApi = new MixRestfulApi<MixApplication>(
    MixSwagger.content.application,
    {
      requestSuccessMsg: 'Successfully save your app',
    }
  );

  public moduleApi = new MixRestfulApi<MixModule>(
    MixSwagger.content.moduleContent,
    {
      requestSuccessMsg: 'Successfully save your module',
    }
  );

  public moduleDataApi = new MixModuleDataApi(MixSwagger.content.moduleData, {
    requestSuccessMsg: 'Successfully save your data',
  });

  public templateApi = new MixRestfulApi<MixTemplate, GetTemplatesRequest>(
    MixSwagger.content.template,
    {
      requestSuccessMsg: 'Successfully save your template',
    }
  );

  public databaseApi = new MixDatabaseApi(MixSwagger.content.database);

  public appSettingApi = new MixRestfulApi<MixSettings>(
    MixSwagger.settings.config,
    {
      requestSuccessMsg: 'Successfully save app settings',
    }
  );

  // Permission Api
  public permissionApi = new MixRestfulApi<MixPermission>(
    MixSwagger.user.permission
  );

  // Related Api
  public postToPostApi = new MixPostToPostApi(MixSwagger.content.postToPost);

  // Custom Api
  public dashboardApi = new DashboardApiService();

  // Storage Api
  public uploadApi = new UploadApiService();

  // Service Api
  public metadataApi = new MetadataService();

  // User Api
  public accountApi = new MixAccountApi();

  // Sync Api
  public syncApi = new MixSyncApi();

  // ECommerce Api
  public eCommerce = new MixeCommerce();
}

export function uploadFileFn(mixApi: MixApiFacadeService) {
  return (file: File) => {
    const formData = new FormData();
    formData.append('file', file as File);
    formData.append('folder', 'MixContent/StaticFiles');

    return mixApi.uploadApi.uploadFile(formData);
  };
}

export function deleteFileFn(mixApi: MixApiFacadeService) {
  return (fileName: string) => {
    return mixApi.uploadApi.deleteFile(fileName);
  };
}
