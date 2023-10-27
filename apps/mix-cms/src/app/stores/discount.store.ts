import { Injectable } from '@angular/core';
import {
  MixKiotVietProduct,
  MixPost,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { BaseCRUDStore } from '@mixcore/share/base';
import { forkJoin, map, of, switchMap } from 'rxjs';

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

  public override requestName = 'discount';
}
