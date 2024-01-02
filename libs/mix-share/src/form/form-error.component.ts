import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  Optional,
  Self,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ERROR_MAP, ErrorMap } from './error-map';

@Component({
  selector: 'mix-form-error',
  template:
    '<div style="color: var(--form-error); line-height: 2" *ngIf="errorMsg() as msg"> {{ msg }}</div>',
  styles: [],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormErrorComponent implements ControlValueAccessor {
  public errorMsg = signal<string | null>(null);
  public destroyRef = inject(DestroyRef);

  constructor(
    @Optional()
    @Self()
    @Inject(NgControl)
    private readonly ngControl: NgControl | null,
    @Inject(ERROR_MAP) public errorMap: ErrorMap
  ) {
    if (ngControl && !ngControl.valueAccessor) {
      ngControl.valueAccessor = this;
    }
  }

  registerOnChange(): void {
    //
  }

  registerOnTouched(): void {
    //
  }

  setDisabledState(): void {
    //
  }

  writeValue(): void {
    //
  }

  ngOnInit() {
    this.control?.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.errorMsg.set(this.computedError);
      });
  }

  get computedError(): string | null {
    return this.invalid && this.touched ? this.error : null;
  }

  private get error(): string | null {
    if (!this.control?.errors) return null;

    const error = Object.keys(this.control?.errors)[0];
    const errorValue = this.control?.errors[error];

    return this.errorMap[error]
      ? this.errorMap[error](errorValue)
      : 'Invalid field';
  }

  public get control(): AbstractControl | null {
    return this.ngControl?.control || null;
  }

  public get invalid(): boolean {
    return !!this.control?.invalid;
  }

  public get touched(): boolean {
    return !!this.control?.touched;
  }
}
