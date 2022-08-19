import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  InputLabeledComponent,
  SkeletonLoadingComponent,
  SwitchComponent
} from '@mix/mix.ui';
import {
  MixModulePortalModel,
  MixPostPortalModel,
  MixTableReferenceModel
} from '@mix-spa/mix.lib';
import { TuiPaginationModule, TuiToggleModule } from '@taiga-ui/kit';
import { combineLatest, switchMap } from 'rxjs';

import { BaseComponent } from '../../bases';
import { MixModuleApiService } from '../../services';
import { MixPageModuleApiService } from '../../services/api/mix-page-module-api.service';

@Component({
  selector: 'mix-page-module-selected',
  templateUrl: './page-module-selected.component.html',
  styleUrls: ['./page-module-selected.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TuiPaginationModule,
    SkeletonLoadingComponent,
    TuiToggleModule,
    SwitchComponent,
    InputLabeledComponent,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageModuleSelectedComponent
  extends BaseComponent
  implements OnInit
{
  @Input() public parentId!: number;
  public modules: { isSelected: boolean; item: MixModulePortalModel }[] = [];
  public moduleNav: MixTableReferenceModel[] = [];
  public searchText = '';

  public get viewableModule(): {
    isSelected: boolean;
    item: MixPostPortalModel;
  }[] {
    return this.modules.filter(post =>
      post.item.title
        .toLocaleLowerCase()
        .trim()
        .includes((this.searchText || '').toLocaleLowerCase().trim())
    );
  }

  constructor(
    private moduleApi: MixModuleApiService,
    private pageModuleApi: MixPageModuleApiService,
    private location: Location
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public loadData(): void {
    this.loading$.next(true);
    combineLatest([
      this.pageModuleApi.search({
        pageSize: 1000,
        parentId: this.parentId
      }),
      this.moduleApi.gets({ pageSize: 1000 })
    ]).subscribe(result => {
      const [moduleNav, modules] = result;
      this.moduleNav = moduleNav.items;
      this.modules = modules.items.map(post => {
        return {
          isSelected:
            this.moduleNav.find(pn => pn.childId === post.id) != undefined,
          item: post
        };
      });

      this.loading$.next(false);
    });
  }

  public checkedChange(isCheck: boolean, post: MixPostPortalModel): void {
    this.disabled$.next(true);
    if (isCheck) {
      this.pageModuleApi
        .getDefault()
        .pipe(
          switchMap(empty => {
            return this.pageModuleApi.save({
              ...empty,
              parentId: this.parentId,
              childId: post.id
            });
          })
        )
        .subscribe((result: MixTableReferenceModel) => {
          this.showSuccess('Link module success!');
          this.moduleNav.push(result);
          this.disabled$.next(false);
        });
    } else {
      const postNav = this.moduleNav.find(pn => pn.childId === post.id);
      if (!postNav) return;

      this.pageModuleApi.remove(postNav.id).subscribe(() => {
        this.showSuccess('Un-link module success!');
        this.moduleNav = this.moduleNav.filter(pn => pn.id === postNav.id);
        this.disabled$.next(false);
      });
    }
  }
}
