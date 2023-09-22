import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MixButtonComponent } from '@mixcore/ui/button';
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
import { Observable, Subject, forkJoin, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'mix-array-media',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputFilesModule,
    TuiFilesModule,
    TuiPreviewModule,
    TuiButtonModule,
    FormsModule,
    MixButtonComponent,
    DragDropModule,
  ],
  templateUrl: './array-media.component.html',
  styleUrls: ['./array-media.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MixArrayMediaComponent,
      multi: true,
    },
  ],
})
export class MixArrayMediaComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  previewService = inject(TuiPreviewDialogService);
  toast = inject(HotToastService);

  @Input() requestFn!: (file: TuiFileLike) => Observable<string>;
  @Input() deleteFn!: (fileName: string) => Observable<void>;

  @ViewChild('preview')
  readonly preview?: TemplateRef<TuiDialogContext>;

  control = new FormControl();
  processingImages = signal(<TuiFileLike[]>[]);

  images: string[] = [];
  orderImages: string[][] = [];

  destroy$ = new Subject();
  disabled = signal(false);
  previewIndex = 0;
  maxFileSize = 4;

  onChange = (value: string[]) => value;
  onTouch = () => undefined;

  ngOnInit() {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.processingImages.update((f) => [...f, ...v]);
      this.control.reset(null, { emitEvent: false });
      this.uploads();
    });
  }

  uploads() {
    const requests = this.processingImages().map((file) =>
      this.requestFn(file).pipe(
        tap((result) => {
          this.processingImages.update((v) =>
            v.filter((x) => x.name !== file.name)
          );

          this.images = this.images.concat(result);
          this.orderImages = this.chunkArray(this.images, 4);
        })
      )
    );

    forkJoin(requests).subscribe({
      next: () => {
        this.onChange(this.images);
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next({});
  }

  writeValue(obj: string[]): void {
    this.images = obj || [];
    this.orderImages = this.chunkArray(this.images, 4);
  }

  registerOnChange(fn: (value: string[]) => string[]): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => undefined): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  showPreview(index: number): void {
    this.previewIndex = index;
    this.previewService.open(this.preview || '').subscribe({});
  }

  delete(file: string): void {
    // this.deleteFn(file).subscribe();

    this.images = this.images.filter((f) => f !== file);
    this.orderImages = this.chunkArray(this.images, 4);
    this.onChange(this.images);
  }

  rejectFile(file: any) {
    this.toast.error(`Reached max file size of ${this.maxFileSize}mb`, {
      position: 'bottom-center',
      autoClose: false,
    });
  }

  drop(event: CdkDragDrop<any>) {
    this.images[event.previousContainer.data.index] = event.container.data.item;
    this.images[event.container.data.index] = event.previousContainer.data.item;

    this.onChange(this.images);
  }

  chunkArray(array: string[], chunkSize: number) {
    const chunkedArray = [];
    const length = array.length;

    for (let i = 0; i < length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunkedArray.push(chunk);
    }

    return chunkedArray;
  }
}
