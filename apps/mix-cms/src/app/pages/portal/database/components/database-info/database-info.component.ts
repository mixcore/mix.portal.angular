import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MixFormErrorComponent } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'mix-database-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MixInputComponent,
    MixTextAreaComponent,
    MixFormErrorComponent,
    MixButtonComponent,
  ],
  templateUrl: './database-info.component.html',
  styleUrls: ['./database-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseInfoComponent {
  @Input() form!: FormGroup;
  public destroyRef = inject(DestroyRef);

  public ngOnInit() {
    this.form.controls['displayName'].valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(600))
      .subscribe((value) => {
        if (!value || this.form.value.systemName) return;

        this.updateSystemName(value);
      });
  }

  public updateSystemName(value: string) {
    const words = value.split(' ');
    const camelCaseString = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const prefix = 'mixDb_';

    this.form.controls['systemName'].patchValue(`${prefix}${camelCaseString}`, {
      emitEvent: false,
    });

    // this.cdr.detectChanges();
  }
}
