import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserListVm } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { UserInfoStore } from '@mixcore/share/stores';
import { tuiPure } from '@taiga-ui/cdk';
import {
  TuiDataListModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiAvatarModule, TuiSelectModule } from '@taiga-ui/kit';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'mix-user-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    TuiAvatarModule,
  ],
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSelectComponent),
      multi: true,
    },
  ],
})
export class UserSelectComponent implements ControlValueAccessor {
  public mixApi = inject(MixApiFacadeService);
  public store = inject(UserInfoStore);
  public control = new FormControl();
  public userData: UserListVm[] = [];
  public userDataMap: Record<string, UserListVm> = {};
  public disabled = false;
  public onChange!: (provinceData: string) => void;
  public onTouched!: () => void;

  @tuiPure
  public identityMatcher(
    userId: string,
    userDataMap: Record<string, UserListVm>
  ) {
    return userDataMap[userId];
  }

  constructor() {
    this.store.vm$
      .pipe(
        filter((s) => s.status === 'Success'),
        takeUntilDestroyed()
      )
      .subscribe((s) => {
        this.userData = s.data;
        this.userData.forEach((user) => (this.userDataMap[user.id] = user));
      });
  }

  public writeValue(userId: string): void {
    this.control.patchValue(userId);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;

    this.control.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((v) => this.onChange(v));
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
