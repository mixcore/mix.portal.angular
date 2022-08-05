import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { SkeletonLoadingComponent, SwitchComponent } from '@mix/mix.ui';
import {
  MixPostPortalModel,
  MixPostReferenceModel,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix-spa/mix.lib';
import { TuiPaginationModule, TuiToggleModule } from '@taiga-ui/kit';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { BaseComponent } from '../../bases';
import { MixPostApiService } from '../../services/api/mix-post-api.service';

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
export class PostNavSelectedComponent extends BaseComponent {
  @Input() public selectedPosts: MixPostReferenceModel[] = [];
  @Output() public selectedPostsChange: EventEmitter<MixPostReferenceModel[]> =
    new EventEmitter();
  public data$!: Observable<PaginationResultModel<MixPostPortalModel>>;
  public request$: BehaviorSubject<PaginationRequestModel> =
    new BehaviorSubject<PaginationRequestModel>({
      pageSize: 10,
      keyword: '',
      pageIndex: 0,
      searchColumns: 'title',
      searchMethod: 'Like'
    });

  constructor(private postApi: MixPostApiService) {
    super();
    this.loadPost();
  }

  public loadPost(): void {
    this.data$ = this.request$.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(request => this.postApi.getPosts(request)),
      tap(() => this.loading$.next(false))
    );
  }

  public isChecked(value: MixPostPortalModel): boolean {
    return this.selectedPosts.findIndex(post => post.id === value.id) >= 0;
  }

  public checkedChange(isCheck: boolean, post: MixPostPortalModel): void {
    if (isCheck) {
      this.selectedPosts.push();
    } else {
      this.selectedPosts = this.selectedPosts.filter(p => p.id !== post.id);
    }

    this.selectedPostsChange.emit(this.selectedPosts);
  }
}
