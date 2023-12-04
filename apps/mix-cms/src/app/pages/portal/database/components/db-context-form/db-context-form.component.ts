import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseProvider, DatabaseProviderDisplay } from '@mixcore/lib/model';
import { BaseComponent } from '@mixcore/share/base';
import { FormHelper } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { delay, of } from 'rxjs';

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
  public dbProviders = Object.keys(DatabaseProvider);
  public dbProviderLabel = (value: DatabaseProvider) =>
    DatabaseProviderDisplay[value];

  public form = inject(FormBuilder).group({
    displayName: ['', Validators.required],
    systemName: ['', Validators.required],
    databaseProviders: [DatabaseProvider.PostgreSQL],
    schema: [true],
    connectionString: ['', Validators.required],
  });

  onSubmit() {
    if (FormHelper.validateForm(this.form)) {
      this.form.disable();
      of(null)
        .pipe(delay(5000), this.observerLoadingStateSignal())
        .subscribe({
          next: () => {},
          error: () => {
            this.form.enable();
          },
        });
    }
  }
}
