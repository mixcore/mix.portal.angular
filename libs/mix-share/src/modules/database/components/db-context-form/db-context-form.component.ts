import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DatabaseProvider,
  DatabaseProviderDisplay,
  MixDbContext,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { FormHelper } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { DialogRef } from '@ngneat/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { debounceTime, tap } from 'rxjs';

@Component({
  selector: 'mix-db-context-form',
  standalone: true,
  imports: [
    CommonModule,
    MixInputComponent,
    MixTextAreaComponent,
    MixSelectComponent,
    MixButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './db-context-form.component.html',
  styleUrl: './db-context-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DbContextFormComponent extends BaseComponent {
  public mixApi = inject(MixApiFacadeService);
  public destroyRef = inject(DestroyRef);
  public toast = inject(HotToastService);
  public dialogRef = inject(DialogRef);

  public dbProviders = Object.values(DatabaseProvider);
  public dbProviderLabel = (value: DatabaseProvider) =>
    DatabaseProviderDisplay[value];

  public form = inject(FormBuilder).group({
    displayName: ['', Validators.required],
    systemName: ['', Validators.required],
    databaseProvider: [DatabaseProvider.PostgreSQL],
    schema: [''],
    connectionString: ['', Validators.required],
  });

  public displayName$ = this.form.controls.displayName.valueChanges.pipe(
    takeUntilDestroyed(),
    debounceTime(600),
    tap(() => this.updateSystemName())
  );

  ngOnInit() {
    this.displayName$.subscribe();
  }

  public onSubmit() {
    if (FormHelper.validateForm(this.form)) {
      this.form.disable();
      this.mixApi.databaseContext
        .save(this.form.value as MixDbContext)
        .pipe(this.observerLoadingStateSignal())
        .subscribe({
          next: () => {
            this.toast.success('Successfully create your db context');
            this.dialogRef.close(true);
          },
          error: () => {
            this.toast.error('Something error, please try again later');
            this.form.enable();
          },
        });
    }
  }

  public updateSystemName(force = false) {
    const displayName = this.form.value.displayName;
    if (!displayName) {
      this.form.controls.systemName.patchValue('');
      return;
    }

    if (this.form.value.systemName && !force) return;

    const words = displayName.split(' ');
    const camelCaseString = words
      .map(
        (word, index) =>
          (index === 0
            ? word.charAt(0).toLocaleLowerCase()
            : word.charAt(0).toUpperCase()) + word.slice(1)
      )
      .join('');

    const prefix = '';
    this.form.controls.systemName.patchValue(`${prefix}${camelCaseString}`, {
      emitEvent: false,
    });
  }
}
