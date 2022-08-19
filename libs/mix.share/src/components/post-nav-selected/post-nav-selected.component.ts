import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { SkeletonLoadingComponent, SwitchComponent } from '@mix/mix.ui';
import { MixPostPortalModel, MixPostReferenceModel } from '@mix-spa/mix.lib';
import { TuiPaginationModule, TuiToggleModule } from '@taiga-ui/kit';
import { combineLatest, switchMap } from 'rxjs';

import { BaseComponent } from '../../bases';
import { MixPostApiService } from '../../services/api/mix-post-api.service';
import { MixPostPostApiService } from '../../services/api/mix-post-post-api.service';

@Component({
  selector: 'mix-post-nav-selected',
  templateUrl: './post-nav-selected.component.html',
  styleUrls: ['./post-nav-selected.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiPaginationModule,
    SkeletonLoadingComponent,
    TuiToggleModule,
    SwitchComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostNavSelectedComponent extends BaseComponent implements OnInit {
  @Input() public parentId!: number;
  @Input() public selectedPosts: MixPostReferenceModel[] = [];

  public posts: { isSelected: boolean; item: MixPostPortalModel }[] = [];
  public postNav: MixPostReferenceModel[] = [];

  constructor(
    private postApi: MixPostApiService,
    private postPostApi: MixPostPostApiService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.loading$.next(true);
    combineLatest([
      this.postPostApi.search({
        pageSize: 1000,
        parentId: this.parentId
      }),
      this.postApi.gets({ pageSize: 1000 })
    ]).subscribe(result => {
      const [postNav, posts] = result;
      this.postNav = postNav.items;
      this.posts = posts.items
        .filter(post => post.id !== this.parentId)
        .map(post => {
          return {
            isSelected: !!this.postNav.find(pn => pn.parentId === post.id),
            item: post
          };
        });

      this.loading$.next(false);
    });
  }

  public isChecked(value: MixPostPortalModel): boolean {
    return this.selectedPosts.findIndex(post => post.id === value.id) >= 0;
  }

  public checkedChange(isCheck: boolean, post: MixPostPortalModel): void {
    if (isCheck) {
      this.postPostApi
        .getDefault()
        .pipe(
          switchMap(empty => {
            return this.postPostApi.save({
              ...empty,
              parentId: this.parentId,
              childId: post.id
            });
          })
        )
        .subscribe(() => {
          console.log('ok');
        });
    } else {
      this.postPostApi;
    }
  }
}
