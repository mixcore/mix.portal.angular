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
  MixDynamicData,
  MixFilter,
  MixOrderBy,
  MixPost,
  OrderDisplay,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import {
  CompressImageComponent,
  MixSubToolbarComponent,
} from '@mixcore/share/components';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { FormHelper } from '@mixcore/share/form';
import { MixUtcDatePipe, RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { DateUtils, Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { MixDateTimePickerComponent } from '@mixcore/ui/date-time-picker';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixInputNumberComponent } from '@mixcore/ui/input-number';
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
  TuiHostedDropdownModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiInputRangeModule,
  TuiMultiSelectModule,
  TuiStringifyContentPipeModule,
} from '@taiga-ui/kit';
import { debounceTime, forkJoin, takeUntil } from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { BulkAssignMetadataComponent } from '../../../components/bulk-assign-metadata/bulk-assign-metadata.component';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { DiscountStore } from '../../../stores/discount.store';

@Component({
  selector: 'mix-post-discount',
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
    MixDatePickerComponent,
    MixDateTimePickerComponent,
    MixInputNumberComponent,
    TuiInputRangeModule,
    MixUtcDatePipe,
  ],
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.less'],
  providers: [TuiDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDiscountComponent implements OnInit {
  router = inject(Router);
  store = inject(DiscountStore);
  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  cdr = inject(ChangeDetectorRef);
  destroy$ = inject(TuiDestroyService);
  modal = inject(ModalService);

  bulkActionStatus: MixContentStatus | string = MixContentStatus.Published;
  forceLoading = false;
  searchOptions = ['title'];
  selectedPosts: MixPost[] = [];
  showFilter = true;
  showBulkAssignMetadata = false;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    direction: new FormControl(),
    orderBy: new FormControl(),
    percentageRange: new FormControl([0, 0]),
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
  discountRuleForm = new FormGroup({
    discountFromDate: new FormControl<Date | null>(null, Validators.required),
    discountToDate: new FormControl<Date | null>(null, Validators.required),
    discountPercent: new FormControl<number | null>(null, Validators.required),
  });

  readonly pluralize = {
    other: '%',
  };

  metadataOptions: Record<string, Partial<MixFilter>[]> = {};
  metadataDisplays: Record<string, string> = {};
  metadataForms: Record<string, FormControl> = {};
  contextMenus: TableContextMenu<MixPost>[] = [
    {
      label: 'View Product Detail',
      action: (item: MixPost) => {
        this.goDetail(item.id);
      },
      icon: 'edit',
    },
    {
      label: 'Clear Cache',
      action: (item: MixPost) => {
        this.mixApi.postApi
          .removeCache(item.id)
          .pipe(
            this.toast.observe({
              success: 'Successfully clear cache',
              error: 'Something error, please try again',
            })
          )
          .subscribe();
      },
      icon: 'autorenew',
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
      .pipe(takeUntil(this.destroy$), debounceTime(400))
      .subscribe((filterValue) => {
        const queries = [];

        if (filterValue.fromDate) {
          queries.push(<MixFilter>{
            value: DateUtils.setToStartOfDay(filterValue.fromDate),
            compareOperator: 'GreaterThanOrEqual',
            fieldName: 'discountFromDate',
          });
        }

        if (filterValue.toDate) {
          queries.push(<MixFilter>{
            value: filterValue.toDate,
            compareOperator: 'LessThanOrEqual',
            fieldName: 'discountToDate',
          });
        }

        const max = filterValue.percentageRange?.[1];
        if (max !== undefined && max > 0) {
          queries.push(<MixFilter>{
            value: filterValue.percentageRange?.[0] ?? 0,
            compareOperator: 'GreaterThanOrEqual',
            fieldName: 'discountPercent',
          });

          queries.push(<MixFilter>{
            value: max,
            compareOperator: 'LessThanOrEqual',
            fieldName: 'discountPercent',
          });
        }

        const filter = <Partial<PaginationRequestModel>>{
          queries: queries,
          orderBy: filterValue.orderBy,
          mixDatabaseName: 'KiotvietProduct',
        };

        this.store.filterChange(Utils.clean(filter));
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

  public applyDiscount() {
    if (!this.selectedPosts.length) return;
    if (FormHelper.validateForm(this.discountRuleForm)) {
      this.modal.asKForAction(
        'Are you sure to apply discount to these item(s), the previous data will be overwrite',
        () => {
          const requests = this.selectedPosts.map((post) => {
            return this.mixApi.databaseApi.patchData(
              post.mixDatabaseName,
              post.kiotVietProduct!.id!,
              this.discountRuleForm.getRawValue() as unknown as MixDynamicData
            );
          });

          forkJoin(requests)
            .pipe(
              this.toast.observe({
                loading: 'Saving...',
                success: 'Successfully apply your changes',
                error: 'Something error, please try gain',
              })
            )
            .subscribe(() => {
              this.mixApi.postApi
                .multiClearCache(
                  this.selectedPosts.map((p) => p.kiotVietProduct!.id!)
                )
                .subscribe();

              this.store.reload();
            });
        }
      );
    }
  }

  public onItemSelectedChange(items: MixPost[]) {
    this.selectedPosts = items;

    if (this.selectedPosts.length === 1) {
      const selectProduct = this.selectedPosts[0].kiotVietProduct;
      this.discountRuleForm.patchValue(selectProduct as any);
    }

    if (!this.selectedPosts.length) {
      this.discountRuleForm.reset();
    }
  }

  public onBulkRemoveDiscount() {
    if (!this.selectedPosts.length) return;

    const requests = this.selectedPosts.map((post) => {
      return this.mixApi.databaseApi.patchData(
        post.mixDatabaseName,
        post.kiotVietProduct!.id!,
        {
          discountFromDate: null,
          discountToDate: null,
          discountPercent: 0,
        }
      );
    });

    forkJoin(requests)
      .pipe(
        this.toast.observe({
          loading: 'Removing...',
          success: 'Successfully apply your changes',
          error: 'Something error, please try gain',
        })
      )
      .subscribe(() => {
        this.mixApi.postApi
          .multiClearCache(
            this.selectedPosts.map((p) => p.kiotVietProduct!.id!)
          )
          .subscribe();

        this.store.reload();
      });
  }
}
