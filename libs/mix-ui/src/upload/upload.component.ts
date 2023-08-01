import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import {
  TuiPreviewDialogService,
  TuiPreviewModule,
} from '@taiga-ui/addon-preview';
import { TuiButtonModule, TuiDialogContext } from '@taiga-ui/core';
import {
  TuiFileLike,
  TuiFilesModule,
  TuiInputFilesModule,
} from '@taiga-ui/kit';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { MixButtonComponent } from '../button/button.component';
import { MixInputComponent } from '../input/input.component';

@Component({
  selector: 'mix-upload',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputFilesModule,
    TuiFilesModule,
    MixInputComponent,
    TuiFilesModule,
    TuiPreviewModule,
    TuiButtonModule,
    MixButtonComponent,
  ],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MixUploadComponent),
      multi: true,
    },
  ],
})
export class MixUploadComponent implements OnInit, ControlValueAccessor {
  previewService = inject(TuiPreviewDialogService);
  toast = inject(HotToastService);

  @Input() deleteFn!: (fileName: string) => Observable<void>;
  @Input({ required: true }) requestFn!: (
    file: TuiFileLike
  ) => Observable<string>;

  @ViewChild('preview')
  readonly preview?: TemplateRef<TuiDialogContext>;

  onChange!: (image: string) => void;
  onTouched!: () => void;

  control = new FormControl();
  filePath = '';
  disabled = false;
  processFile = signal<TuiFileLike | undefined>(undefined);
  errorFile = signal<TuiFileLike | undefined>(undefined);
  error = signal(false);
  maxFileSize = 4;

  public get isMedia() {
    if (!this.filePath) return false;

    const fileExtension = this.filePath.match(/\.([0-9a-z]+)(?:[\\?#]|$)/i);
    if (!fileExtension) return false;

    if (['mp4'].includes(fileExtension[1])) return true;

    return false;
  }

  ngOnInit() {
    this.control.valueChanges
      .pipe(
        switchMap((file) => {
          return file ? this.makeRequest(file) : of(null);
        })
      )
      .subscribe({
        next: (v) => {
          if (!v) return;

          this.filePath = v;
          this.processFile.set(undefined);
          this.onChange(v);
        },
      });
  }

  makeRequest(file: TuiFileLike) {
    this.error.set(false);
    this.errorFile.set(undefined);

    this.processFile.set(file);
    return this.requestFn(file).pipe(
      catchError((err) => {
        this.error.set(true);
        this.errorFile.set(this.processFile());
        this.processFile.set(undefined);
        this.control.patchValue(undefined, { emitEvent: false });

        return of(null);
      })
    );
  }

  delete() {
    // this.deleteFn(this.filePath).subscribe();

    this.filePath = '';
    this.onChange('');
  }

  registerOnChange(fn: (image: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(filePath: string): void {
    this.filePath = filePath;
  }

  showPreview(): void {
    this.previewService.open(this.preview || '').subscribe({});
  }

  rejectFile(file: any) {
    this.toast.error(`Reached max file size of ${this.maxFileSize}mb`, {
      position: 'bottom-center',
      autoClose: false,
    });
  }
}
