import { Injectable } from '@angular/core';
import {
  MixKiotVietProduct,
  MixPost,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { BaseCRUDStore } from './base-crud.store';

@Injectable({ providedIn: 'root' })
export class DiscountStore extends BaseCRUDStore<MixPost> {
  public override requestFn = (request: PaginationRequestModel) =>
    this.mixApi.postApi
      .filter({
        ...request,
        columns: 'image,title,status,priority,mixDatabaseName',
        pageSize: 15,
      })
      .pipe(
        switchMap((result) => {
          if (!result.items.length) return of(result);

          const requests = result.items.map((post) =>
            this.mixApi.databaseApi.getDataByPostParent<MixKiotVietProduct>(
              post.mixDatabaseName,
              post.id
            )
          );

          return forkJoin(requests).pipe(
            map((kiotVietProducts) => {
              result.items = result.items.map((post) => {
                post.kiotVietProduct = kiotVietProducts.find(
                  (x) => x.parentId === post.id
                );

                return post;
              });

              return result;
            })
          );
        })
      );

  //   public override mainUrl = '/' + CMS_ROUTES.portal.discount.fullPath;
  public override requestName = 'discount';
}
