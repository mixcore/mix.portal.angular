import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MixDynamicData,
  MixPermission,
  MixPermissionEndpoint,
  PaginationRequestModel,
  PaginationResultModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixDataTableModule } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiTableModule } from '@taiga-ui/addon-table';
import {
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiLinkModule,
} from '@taiga-ui/core';
import { of, switchMap } from 'rxjs';
import { MixSubToolbarComponent } from '../sub-toolbar/sub-toolbar.component';

@Component({
  selector: 'mix-permission-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixButtonComponent,
    MixInputComponent,
    MixSubToolbarComponent,
    TuiTableModule,
    TuiLinkModule,
    MixDataTableModule,
    TuiDropdownModule,
    TuiHostedDropdownModule,
    TuiLinkModule,
    MixFormErrorComponent,
  ],
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PermissionFormComponent extends BaseComponent {
  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);
  readonly permissionDbName = 'sysPermission';
  readonly permissionEndpointDbName = 'sysPermissionEndpoint';

  get permission() {
    return this._permission;
  }
  @Input() set permission(v: MixPermission) {
    this._permission = v;
    this.form.patchValue(this.permission);
    this.loadData();

    setTimeout(() => (this._viewInit = false));
    setTimeout(() => (this._viewInit = true));
  }
  _viewInit = false;
  _permission!: MixPermission;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    type: new FormControl(''),
  });

  addMenuForm = new FormGroup({
    title: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
  });

  showAddMenu = false;
  loadingMenu = signal(true);
  result = signal(<PaginationResultModel<MixPermissionEndpoint>>{
    pagingData: {
      pageIndex: 0,
      pageSize: 10,
    },
  });
  query = signal(<PaginationRequestModel>{
    pageIndex: 0,
    pageSize: 10,
  });

  loadData() {
    this.loadingMenu.set(true);
    this.mixApi.databaseApi
      .getDataByName<MixPermissionEndpoint>(this.permissionEndpointDbName, {
        ...this.query(),
        parentId: this.permission.id,
        parentName: this.permissionDbName,
      })
      .subscribe((v) => {
        this.result.set(v);
        this.loadingMenu.set(false);
      });
  }

  saveData() {
    this.mixApi.permissionApi
      .save({
        ...this.permission,
        ...(this.form.getRawValue() as MixPermission),
      })
      .pipe(
        this.toast.observe({
          loading: 'Saving...',
          success: 'Successfully save data',
          error: 'Something error, please try gain later',
        })
      )
      .subscribe();
  }

  createMenu() {
    if (FormHelper.validateForm(this.addMenuForm)) {
      this.mixApi.databaseApi
        .saveData(
          this.permissionEndpointDbName,
          -1,
          this.addMenuForm.getRawValue() as MixDynamicData
        )
        .pipe(
          switchMap((result) => {
            console.log(result);
            return of(result);
          }),
          this.toast.observe({
            loading: 'Saving...',
            success: 'Successfully save data',
            error: 'Something error, please try gain later',
          })
        )
        .subscribe();
    }
  }
}
