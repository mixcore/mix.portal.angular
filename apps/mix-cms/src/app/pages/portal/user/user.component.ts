import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { ImageHandleDirective } from '@mixcore/share/directives';
import { FormHelper, MixFormErrorComponent } from '@mixcore/share/form';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixErrorAlertComponent } from '@mixcore/ui/error';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixDataTableModule } from '@mixcore/ui/table';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'mix-user',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    RelativeTimeSpanPipe,
    NgOptimizedImage,
    ImageHandleDirective,
    MixInputComponent,
    MixFormErrorComponent,
    MixErrorAlertComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent extends BaseComponent {
  store = inject(UserStore);
  router = inject(Router);
  mixApi = inject(MixApiFacadeService);
  dialog = inject(TuiDialogService);
  toast = inject(HotToastService);

  serverError = signal('');
  registerForm = new FormGroup({
    avatar: new FormControl('', { validators: [], nonNullable: true }),
    username: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    firstName: new FormControl('', { validators: [], nonNullable: true }),
    lastName: new FormControl('', { validators: [], nonNullable: true }),
    email: new FormControl(),
  });

  showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialog.open(content).subscribe();
  }

  createUserClick(dialog: any): void {
    if (!FormHelper.validateForm(this.registerForm)) return;

    const formValue = this.registerForm.getRawValue();
    const request = {
      ...formValue,
      email: formValue.username,
    };

    this.mixApi.accountApi
      .createUser(request)
      .pipe(this.observerLoadingStateSignal())
      .subscribe({
        next: () => {
          this.toast.success('Successfully create new user');
          this.store.reload();
          dialog.complete();
        },
        error: (error: HttpErrorResponse) => {
          const commonMsg = 'Something error, please try again later!';

          if (error.error instanceof Array) {
            this.serverError.set(error.error[0] || commonMsg);
          } else {
            this.serverError.set(commonMsg);
          }
        },
      });
  }

  getNameFromMail(name: string) {
    const lasta = name.lastIndexOf('@');
    if (lasta > 0) {
      return name.substring(0, lasta);
    }

    return name;
  }
}
