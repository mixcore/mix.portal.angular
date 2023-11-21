import {
  MixDatabase,
  MixDynamicData,
  PaginationRequestModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixSwagger } from '@mixcore/lib/swagger';
import { Observable, map } from 'rxjs';
import { IHttpParamObject } from '../bases';
import { MixRestfulApi } from './mix-crud-api.service';

export class MixDatabaseApi extends MixRestfulApi<MixDatabase> {
  public deleteDbColumn(columnId: number) {
    return this.delete(`${MixSwagger.content.mixDbColumn}/${columnId}`);
  }

  public getDatabaseBySystemName(dbSysName: string): Observable<MixDatabase> {
    return this.get<MixDatabase>(
      MixSwagger.content.getDatabaseBySystemName + '/' + dbSysName
    );
  }

  public getData<T = MixDynamicData>(
    dbSysName: string,
    dataId: number
  ): Observable<T> {
    return this.get<T>(`${MixSwagger.content.mixDb}/${dbSysName}/${dataId}`);
  }

  public saveData(
    dbSysName: string,
    dataId: number,
    data: MixDynamicData,
    dbDisplayName?: string
  ): Observable<MixDynamicData> {
    let request = `${MixSwagger.content.mixDb}/${dbSysName}/`;
    if (dataId >= 0) {
      request = request + dataId;
      return this.put<MixDynamicData, MixDynamicData>(
        request,
        data,
        undefined,
        dbDisplayName
          ? {
              requestSuccessMsg: `Successfully save your ${dbDisplayName}`,
            }
          : undefined
      );
    }

    return this.post<MixDynamicData, MixDynamicData>(
      request,
      data,
      undefined,
      undefined,
      dbDisplayName
        ? {
            requestSuccessMsg: `Successfully create your ${dbDisplayName}`,
          }
        : undefined
    );
  }

  public patchData(
    dbName: string,
    dataId: number,
    data: Partial<MixDynamicData>
  ) {
    const request = `${MixSwagger.content.mixDb}/${dbName}/${dataId}`;

    return this.patch<MixDynamicData, MixDynamicData>(request, data);
  }

  public deleteData(dbSysName: string, dataId: number) {
    return this.delete<MixDatabase>(
      `${MixSwagger.content.mixDb}/${dbSysName}/${dataId}`
    );
  }

  public getDataByPostParent<T>(dbName: string, id: number): Observable<T> {
    return this.get<T>(
      `${MixSwagger.content.mixDb}/${dbName}/get-by-parent/Post/${id}`
    );
  }

  public updateDbDataPriority(
    dbName: string,
    dataId: number,
    newPriority: number
  ) {
    const endpoint = `${MixSwagger.content.mixDb}/${dbName}/update-priority/${dbName}/${dataId}`;
    const request = {
      id: dataId,
      priority: newPriority,
    };

    return this.put(endpoint, request);
  }

  public getDataByName<T>(
    dbName: string,
    query: PaginationRequestModel
  ): Observable<PaginationResultModel<T>> {
    return this.post<PaginationRequestModel, PaginationResultModel<T>>(
      `${MixSwagger.content.mixDb}/${dbName}/filter`,
      query as IHttpParamObject
    ).pipe(
      map((result) => ({
        ...result,
        pagingData: {
          ...result.pagingData,
          totalPage: result.pagingData.totalPage
            ? result.pagingData.totalPage
            : Math.ceil(
                (result.pagingData.total ?? 0) / result.pagingData.pageSize
              ),
        },
      }))
    );
  }

  public associateDb(
    childDatabaseName: string,
    childId: number,
    parentDatabaseName: string,
    parentId: number
  ) {
    const request = {
      childDatabaseName,
      childId,
      parentDatabaseName,
      parentId,
    };
    return this.post('/api/v2/rest/mix-portal/mix-db-association', request);
  }

  public deleteAssociateDb(
    childDatabaseName: string,
    childId: number,
    parentDatabaseName: string,
    parentId: number
  ) {
    return this.delete(
      `/api/v2/rest/mix-portal/mix-db-association/${parentDatabaseName}/${childDatabaseName}/${parentId}/${childId}`
    );
  }

  public exportDataByDbName(
    dbSysName: string,
    query: PaginationRequestModel
  ): Observable<{
    extension: string;
    fileFolder: string;
    filename: string;
    fullPath: string;
    webPath: string;
  }> {
    return this.post<
      PaginationRequestModel,
      {
        extension: string;
        fileFolder: string;
        filename: string;
        fullPath: string;
        webPath: string;
      }
    >(`${MixSwagger.content.mixDb}/${dbSysName}/export`, query).pipe(
      map((r) => ({
        ...r,
        fullPath: `${this.domainUrl$.getValue()}/${r.webPath}`,
      }))
    );
  }

  /**
   * Before using a database that you have created for the first time, it must be migrated into a single table.
   *
   */
  public migrateToSingleTable(dbSysName: string) {
    return this.get(`${MixSwagger.content.database}/migrate/${dbSysName}`);
  }

  /**
   * When you activate this button, the system will automatically backup your data in case you need it in the future.
   *
   */
  public backupTable(dbSysName: string) {
    return this.get(`${MixSwagger.content.database}/backup/${dbSysName}`);
  }

  /**
   * Depending on when you last backed up the data, the system will restore it.
   *
   */
  public restoreTable(dbSysName: string) {
    return this.get(`${MixSwagger.content.database}/restore/${dbSysName}`);
  }

  /**
   * When you wish to make changes to your database or add new columns, run this migration.
   *
   */
  public updateDataTable(dbSysName: string) {
    return this.get(`${MixSwagger.content.database}/update/${dbSysName}`);
  }
}
