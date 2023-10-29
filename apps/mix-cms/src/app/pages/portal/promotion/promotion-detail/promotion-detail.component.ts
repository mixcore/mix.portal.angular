import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MixDynamicData, MixPromotion } from '@mixcore/lib/model';
import { MixSubToolbarComponent } from '@mixcore/share/components';
import { FormHelper } from '@mixcore/share/form';
import { MixUtcDatePipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDateTimePickerComponent } from '@mixcore/ui/date-time-picker';
import { MixEditorComponent } from '@mixcore/ui/editor';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixInputNumberComponent } from '@mixcore/ui/input-number';
import { MixQRCodeComponent } from '@mixcore/ui/qr-code';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { MixToggleComponent } from '@mixcore/ui/toggle';
import { HotToastService } from '@ngneat/hot-toast';
import {
  TuiGroupModule,
  TuiLoaderModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import { TuiRadioBlockModule, TuiTabsModule } from '@taiga-ui/kit';
import { takeUntil } from 'rxjs';
import { MixSystemDbName } from '../../../../shares/consts/system-database-name';
import { DetailPageKit } from '../../../../shares/kits/page-detail-base-kit.component';

@Component({
  selector: 'mix-promotion-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixSubToolbarComponent,
    TuiLoaderModule,
    MixButtonComponent,
    MixInputComponent,
    MixQRCodeComponent,
    TuiTabsModule,
    MixDateTimePickerComponent,
    MixEditorComponent,
    MixTextAreaComponent,
    MixInputNumberComponent,
    TuiRadioBlockModule,
    TuiGroupModule,
    MixSelectComponent,
    TuiNotificationModule,
    MixUtcDatePipe,
    MixToggleComponent,
  ],
  templateUrl: './promotion-detail.component.html',
  styleUrls: ['./promotion-detail.component.scss'],
  providers: [MixUtcDatePipe],
})
export class PromotionDetailComponent extends DetailPageKit {
  public toast = inject(HotToastService);
  public mixDatePipe = inject(MixUtcDatePipe);

  public currencyOptions: string[] = ['USD', 'VND'];
  public promotionData: Partial<MixPromotion> = {};
  public promotionForm = new FormGroup({
    code: new FormControl('', Validators.required),
    currency: new FormControl('VND', Validators.required),
    description: new FormControl(''),
    discountPercent: new FormControl(0),
    discountValue: new FormControl(0),
    fromDate: new FormControl(null, Validators.required),
    toDate: new FormControl(null, Validators.required),
    maxAllowed: new FormControl(0, Validators.required),
    maxTotalBill: new FormControl(0, Validators.required),
    minTotalBill: new FormControl(0, Validators.required),
    maxDiscountValue: new FormControl(null),
    promotionType: new FormControl('Coupon', Validators.required),
    promotionMode: new FormControl('Public'),
    title: new FormControl('', Validators.required),
    totalUsed: new FormControl(''),
    allowDiscountProduct: new FormControl(false),
  });

  constructor() {
    super();
    this.activeRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.id = params['id'];

        if (!this.id) return;
        if (this.id === 'create') {
          this.mode = 'create';
        } else {
          this.mode = 'update';
          this.mixApi.databaseApi
            .getData<MixPromotion>(MixSystemDbName.Promotion, this.id)
            .pipe(this.observerLoadingStateSignal())
            .subscribe((v) => {
              this.promotionData = v;
              if (this.promotionData.fromDate)
                this.promotionData.fromDate = this.mixDatePipe.transform(
                  this.promotionData.fromDate
                );

              if (this.promotionData.toDate)
                this.promotionData.toDate = this.mixDatePipe.transform(
                  this.promotionData.toDate
                );

              this.promotionForm.patchValue(this.promotionData as any);

              const mode = v.assignedUserOnly ? 'Assigned' : 'Public';
              this.promotionForm.controls.promotionMode.patchValue(mode);
            });
        }
      });
  }

  public onSave() {
    if (FormHelper.validateForm(this.promotionForm)) {
      const value = <MixPromotion>{
        ...this.promotionData,
        ...this.promotionForm.getRawValue(),
      };

      this.mixApi.databaseApi
        .saveData(
          MixSystemDbName.Promotion,
          value.id ?? -1,
          value as unknown as MixDynamicData
        )
        .pipe(
          this.observerLoadingStateSignal(),
          this.toast.observe({
            loading: this.mode === 'create' ? 'Creating' : 'Saving',
            success: 'Successfully apply your change',
            error: 'Something error, please try gain',
          })
        )
        .subscribe(() => {
          if (this.mode === 'create') this.mode = 'update';
        });
    }
  }
}
