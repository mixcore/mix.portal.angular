import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MixFilter,
  MixPromotion,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { MixUtcDatePipe } from '@mixcore/share/pipe';
import { DateUtils, Utils } from '@mixcore/share/utils';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDatePickerComponent } from '@mixcore/ui/date-picker';
import { ModalService } from '@mixcore/ui/modal';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixDataTableModule } from '@mixcore/ui/table';
import { TranslocoModule } from '@ngneat/transloco';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { debounceTime, takeUntil } from 'rxjs';
import { CMS_ROUTES } from '../../../app.routes';
import { MixSystemDbName } from '../../../shares/consts/system-database-name';
import { ListPageKit } from '../../../shares/kits/list-page-kit.component';
import { PromotionStore } from '../../../stores/promotion.store';

@Component({
  selector: 'mix-promotion',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    ReactiveFormsModule,
    MixDataTableModule,
    MixButtonComponent,
    TranslocoModule,
    MixDatePickerComponent,
    MixUtcDatePipe,
    MixSelectComponent,
  ],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
  providers: [PromotionStore, TuiDestroyService],
  encapsulation: ViewEncapsulation.None,
})
export class PromotionComponent
  extends ListPageKit<MixPromotion>
  implements OnInit
{
  store = inject(PromotionStore);
  mixApi = inject(MixApiFacadeService);
  modal = inject(ModalService);

  public currencyOptions: string[] = ['All', 'USD', 'VND'];
  public filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
    direction: new FormControl(),
    orderBy: new FormControl(),
    percentageRange: new FormControl([0, 0]),
    currency: new FormControl('All'),
  });

  constructor() {
    super({
      contextMenu: [
        {
          label: 'View',
          action: (item) => this.goDetail(item.id),
          icon: 'edit',
        },
        {
          label: 'Delete',
          action: (item) => this.delete(item),
          icon: 'delete',
        },
      ],
      searchOptions: [],
      detailUrl: `${CMS_ROUTES.portal.promotion.fullPath}`,
    });
  }

  ngOnInit() {
    this.filterForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(400))
      .subscribe((filterValue) => {
        const queries = [];

        if (filterValue.fromDate) {
          queries.push(<MixFilter>{
            value: DateUtils.setToStartOfDay(filterValue.fromDate),
            compareOperator: 'GreaterThanOrEqual',
            fieldName: 'fromDate',
          });
        }

        if (filterValue.currency && filterValue.currency !== 'All') {
          queries.push(<MixFilter>{
            value: filterValue.currency,
            compareOperator: 'InRange',
            fieldName: 'currency',
          });
        }

        if (filterValue.toDate) {
          queries.push(<MixFilter>{
            value: filterValue.toDate,
            compareOperator: 'LessThanOrEqual',
            fieldName: 'toDate',
          });
        }

        const filter = <Partial<PaginationRequestModel>>{
          queries: queries,
        };

        this.store.filterChange(Utils.clean(filter));
      });
  }

  addNew() {
    this.router.navigateByUrl(`${this.detailUrl}/create`);
  }

  public delete(item: MixPromotion): void {
    this.modal.asKForAction('Are you sure to delete this promotion?', () => {
      this.mixApi.databaseApi
        .deleteData(MixSystemDbName.Promotion, item.id)
        .pipe(
          this.toast.observe({
            loading: 'Processing',
            success: 'Successfully apply your change',
            error: 'Something error, please try again',
          })
        )
        .subscribe(() => this.store.reload());
    });
  }
}
