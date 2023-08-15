import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Metadata,
  MixContentStatus,
  MixFilter,
  MixOrderBy,
  MixPost,
  OrderDisplay,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { FormHelper } from '@mixcore/share/form';
import { toastObserverProcessing } from '@mixcore/share/helper';

import {
  MixImgLoaderPipe,
  MixUtcDatePipe,
  RelativeTimePipe,
  RelativeTimeSpanPipe,
} from '@mixcore/share/pipe';
import { Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixDataTableModule, TableContextMenu } from '@mixcore/ui/table';
import { EditableModule } from '@ngneat/edit-in-place';
import { HotToastService } from '@ngneat/hot-toast';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiDestroyService } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiGroupModule,
  TuiHintModule,
  TuiHostedDropdownModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputTagModule,
  TuiMultiSelectModule,
  TuiPushService,
  TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';
import { debounceTime, forkJoin, takeUntil, tap } from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { BulkAssignMetadataComponent } from '../../../components/bulk-assign-metadata/bulk-assign-metadata.component';
import { CompressImageComponent } from '../../../components/compress-image/compress-image.component';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { PostStore } from '../../../stores/post.store';

@Component({
  selector: 'mix-post',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
    TranslocoModule,
    MixSelectComponent,
    MixDatePickerComponent,
    ReactiveFormsModule,
    TuiHintModule,
    ImageHandleDirective,
    FormsModule,
    TuiMultiSelectModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiStringifyContentPipeModule,
    CompressImageComponent,
    TuiGroupModule,
    TuiButtonModule,
    TuiDataListModule,
    TuiHostedDropdownModule,
    BulkAssignMetadataComponent,
    TuiDialogModule,
    MixInputComponent,
    EditableModule,
    TuiInputTagModule,
    MixUtcDatePipe,
    RelativeTimePipe,
    MixImgLoaderPipe,
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent implements OnInit {
  router = inject(Router);
  store = inject(PostStore);
  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  cdr = inject(ChangeDetectorRef);
  destroy$ = inject(TuiDestroyService);
  modal = inject(ModalService);
  push = inject(TuiPushService);

  bulkActionStatus: MixContentStatus | string = MixContentStatus.Published;
  forceLoading = false;
  searchOptions = ['title'];
  selectedPosts: MixPost[] = [];
  showFilter = false;
  showBulkAssignMetadata = false;
  filterForm = new FormGroup({
    status: new FormControl(),
    fromDate: new FormControl(),
    toDate: new FormControl(),
    direction: new FormControl(),
    orderBy: new FormControl(),
  });
  filterOptions: MixContentStatus[] = [
    MixContentStatus.Draft,
    MixContentStatus.Published,
    MixContentStatus.Preview,
    MixContentStatus.Deleted,
  ];
  orderByOptions: string[] = [MixOrderBy.Priority, MixOrderBy.CreatedDateTime];
  directionOptions: string[] = ['Asc', 'Desc'];
  stringify = (value: MixOrderBy) => OrderDisplay[value];
  stringifyMetadata = (value: MixFilter) => value?.displayName ?? '';
  openChooseBulkAction = false;
  openChooseBulkStatus = false;
  showQuickAddPost = false;
  addPostForm = new FormGroup({
    names: new FormControl([], Validators.required),
  });

  metadataOptions: Record<string, Partial<MixFilter>[]> = {};
  metadataDisplays: Record<string, string> = {};
  metadataForms: Record<string, FormControl> = {};
  contextMenus: TableContextMenu<MixPost>[] = [
    {
      label: 'Edit',
      action: (item: MixPost) => this.goDetail(item.id),
      icon: 'edit',
    },
    {
      label: 'Sync data',
      action: (item: MixPost) =>
        this.mixApi.syncApi
          .syncProducts([item.title], false, true)
          .pipe(toastObserverProcessing(this.toast))
          .subscribe(() => this.store.reload()),
      icon: 'sync_saved_locally',
    },
    {
      label: 'Scale image',
      action: (item: MixPost) =>
        this.mixApi.syncApi
          .syncProducts([item.title], true)
          .pipe(toastObserverProcessing(this.toast))
          .subscribe(),
      icon: 'compare',
    },
    {
      label: 'Clear Cache',
      action: (item: MixPost) =>
        this.mixApi.postApi
          .removeCache(item.id)
          .pipe(toastObserverProcessing(this.toast))
          .subscribe(),
      icon: 'autorenew',
    },
    {
      label: 'Delete',
      action: (item: MixPost) => {
        //
      },
      icon: 'delete',
    },
  ];

  get metadataTypes() {
    return Object.keys(this.metadataOptions);
  }

  goDetail(id: number) {
    this.router.navigateByUrl(`${CMS_ROUTES.portal.post.fullPath}/${id}`);
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.store.filterChange(Utils.clean(value));
      });

    this.filterForm.patchValue(this.store.request$(), { emitEvent: false });
    const request = <PaginationRequestModel>{
      pageIndex: 0,
      pageSize: 300,
      keyword: 'Category,Price ($),Color,SIZE,Shop,Sale,Label',
      searchMethod: 'InRange',
      searchColumns: 'Type',
      direction: 'Desc',
    };

    this.mixApi.databaseApi
      .getDataByName<Metadata>('metadata', request)
      .subscribe((result) => {
        result.items?.forEach((metadata) => {
          const type = metadata.type.toLowerCase();
          if (!this.metadataOptions[type]) {
            this.metadataOptions[type] = [];
            this.metadataOptions[type].push({
              fieldName: type,
              isRequired: false,
              displayName: metadata.content,
              value: metadata.seoContent,
            });
          } else {
            this.metadataOptions[type].push({
              fieldName: type,
              isRequired: false,
              displayName: metadata.content,
              value: metadata.seoContent,
            });
          }
          this.metadataDisplays[type] = metadata.type;
          this.metadataForms[type] = new FormControl();
        });
        Object.keys(this.metadataForms).forEach((key) => {
          this.metadataForms[key].patchValue(
            this.store
              .request$()
              .metadataQueries?.filter((x) => x.fieldName === key) ?? []
          );
          this.metadataForms[key].valueChanges
            .pipe(takeUntil(this.destroy$), debounceTime(300))
            .subscribe((v) => {
              this.onMetadataFilterChange(key, v);
            });
        });
        this.cdr.detectChanges();
      });
  }

  public onMetadataFilterChange(key: string, value: MixFilter[]) {
    this.store.metadataChange(key, value);
  }

  public onDragDropDataChange(data: { item: MixPost; toItem: MixPost }) {
    this.forceLoading = true;
    this.mixApi.postApi
      .updatePriority(data.item.id, data.toItem.priority)
      .subscribe({
        next: () => {
          this.forceLoading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.forceLoading = false;
          this.cdr.detectChanges();
        },
      });
  }

  public buildActionClick() {
    this.modal
      .confirm(
        `Are you sure to mark all selected item(s) into ${this.bulkActionStatus} ?`
      )
      .subscribe((ok) => {
        if (!ok) return;

        const toUpdateRequests = this.selectedPosts.map((post) => ({
          id: post.id,
          status: this.bulkActionStatus,
        }));

        this.mixApi.postApi
          .patchMany(toUpdateRequests)
          .pipe(
            this.toast.observe({
              loading: 'Processing',
              success: 'Successfully apply your changes',
              error: 'Something error, please try gain',
            })
          )
          .subscribe(() => {
            this.store.reload();
            this.selectedPosts = [];
          });
      });
  }

  public bulkDeleteClick() {
    this.modal
      .confirm(
        `Are you sure to delete these item(s), your data may not be revert ?`
      )
      .subscribe((ok) => {
        if (!ok) return;

        const requests = this.selectedPosts
          .map((post) => post.id)
          .map((id) => this.mixApi.postApi.deleteById(id));

        forkJoin(requests)
          .pipe(
            this.toast.observe({
              loading: 'Processing',
              success: 'Successfully apply your changes',
              error: 'Something error, please try gain',
            })
          )
          .subscribe(() => {
            this.store.reload();
            this.selectedPosts = [];
          });
      });
  }

  public syncAllData() {
    this.modal.asKForAction('Are you sure to sync data ?', () => {
      this.mixApi.syncApi
        .syncAll()
        .pipe(
          this.toast.observe({
            loading: 'Processing.',
            success: 'Successfully apply your change.',
            error: 'Something error, please try again later.',
          }),
          tap(() => this.store.reload())
        )
        .subscribe();
    });
  }

  public onSave(value: string, fieldName: string, item: MixPost) {
    const patchItem = { id: item.id };
    (patchItem as any)[fieldName] = value;
    this.mixApi.postApi
      .patchField(patchItem)
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Successfully apply your changes',
          error: 'Something error, please try gain',
        })
      )
      .subscribe(() => this.store.reload());
  }

  public syncPosts() {
    if (FormHelper.validateForm(this.addPostForm)) {
      const namesToAdd =
        this.addPostForm.controls.names.getRawValue() as string[];

      this.addPostForm.disable();
      this.mixApi.syncApi
        .syncProducts(namesToAdd)
        .pipe(
          this.toast.observe({
            loading: 'Processing',
            success: 'Successfully add your post',
            error: 'Something error, please try again',
          })
        )
        .subscribe(() => {
          this.showQuickAddPost = false;
          this.addPostForm.reset();
          this.store.reload();
          this.addPostForm.enable();

          this.push
            .open('Feel free to reload your page.', {
              heading: 'Syncing Product...',
              type: `It's will take a time`,
              icon: 'tuiIconRefreshCwLarge',
              buttons: ['Close'],
            })
            .subscribe();
        });
    }
  }

  metadataTrackBy(index: number, item: string) {
    return item;
  }
}
