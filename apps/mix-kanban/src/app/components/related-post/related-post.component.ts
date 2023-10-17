import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MixPost,
  MixPostPost,
  PaginationRequestModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiLinkModule } from '@taiga-ui/core';
import { TuiPaginationModule, TuiProgressModule } from '@taiga-ui/kit';
import { debounceTime, tap } from 'rxjs';
import { CMS_ROUTES } from '../../app.routes';

@Component({
  selector: 'mix-related-post',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    TuiProgressModule,
    TuiPaginationModule,
    MixInputComponent,
    TuiLinkModule,
    ReactiveFormsModule,
    TranslocoModule,
  ],
  templateUrl: './related-post.component.html',
  styleUrls: ['./related-post.component.scss'],
})
export class RelatedPostComponent implements OnInit {
  @Input() postId!: number;

  @Output() postClick: EventEmitter<void> = new EventEmitter();

  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  router = inject(Router);

  showLoadingPost = signal(true);
  showLoadingRelatedPost = signal(true);
  linkedPostDict: Record<number, boolean> = {};
  deleteLinkedPostDict: Record<number, boolean> = {};

  searchPostForm = new FormControl('');
  relatedPostResult = signal<PaginationResultModel<MixPostPost>>({
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  relatedPostQuery = signal<PaginationRequestModel>({
    pageSize: 10,
    pageIndex: 0,
    parentId: this.postId,
  });

  searchRelatedPostForm = new FormControl('');
  availablePostResult = signal<PaginationResultModel<MixPost>>({
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  availablePostQuery = signal<PaginationRequestModel>({
    pageSize: 10,
    pageIndex: 0,
  });

  ngOnInit(): void {
    this.loadPost();
    this.loadRelatedPost();

    this.searchPostForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchText) => {
        this.availablePostQuery.update((v) => ({
          ...v,
          keyword: searchText as string,
          searchMethod: 'Like',
          searchColumns: 'title',
        }));

        this.loadPost();
      });

    this.searchRelatedPostForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchText) => {
        this.relatedPostQuery.update((v) => ({
          ...v,
          keyword: searchText as string,
          searchMethod: 'Like',
          searchColumns: 'title',
        }));

        this.loadRelatedPost();
      });
  }

  public loadPost() {
    this.showLoadingPost.set(true);
    this.mixApi.postApi.gets(this.availablePostQuery()).subscribe({
      next: (result) => this.availablePostResult.set(result),
      complete: () => this.showLoadingPost.set(false),
    });
  }

  public loadRelatedPost() {
    this.showLoadingRelatedPost.set(true);
    this.mixApi.postToPostApi
      .search({ ...this.relatedPostQuery(), parentId: this.postId })
      .subscribe({
        next: (result) => this.relatedPostResult.set(result),
        complete: () => this.showLoadingRelatedPost.set(false),
      });
  }

  public onPostPageChange(index: number) {
    this.availablePostQuery.update((v) => ({ ...v, pageIndex: index }));
    this.loadPost();
  }

  public onRelatedPostPageChange(index: number) {
    this.relatedPostQuery.update((v) => ({ ...v, pageIndex: index }));
    this.loadRelatedPost();
  }

  public linkPost(childId: number): void {
    this.linkedPostDict[childId] = true;
    this.mixApi.postToPostApi
      .save({
        parentId: this.postId,
        childId: childId,
      })
      .pipe(
        this.toast.observe({
          success: 'Successfully link your items',
          error: (err: HttpErrorResponse) =>
            err.error[0] === 'Entity existed'
              ? 'This item already linked'
              : 'Something error, please try again later',
        })
      )
      .subscribe({
        next: () => {
          this.loadRelatedPost();
        },
        error: () => {
          this.linkedPostDict[childId] = false;
        },
        complete: () => {
          this.linkedPostDict[childId] = false;
        },
      });
  }

  public gotoPost(postId?: number) {
    if (!postId) return;

    this.router.navigateByUrl(CMS_ROUTES.portal.post.fullPath + '/' + postId);
    this.postClick.emit();
  }

  public deleteRelated(relatedPostId: number) {
    this.deleteLinkedPostDict[relatedPostId] = true;
    this.mixApi.postToPostApi
      .deleteById(relatedPostId)
      .pipe(
        this.toast.observe({
          success: 'Successfully unlink your items',
          error: 'Something error, please try again later',
        }),
        tap(() => this.loadRelatedPost())
      )
      .subscribe({
        error: () => {
          this.deleteLinkedPostDict[relatedPostId] = false;
        },
        complete: () => {
          this.deleteLinkedPostDict[relatedPostId] = false;
        },
      });
  }
}
