import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { TippyDirective } from '@ngneat/helipopper';
import { TuiDestroyService } from '@taiga-ui/cdk';

@Component({
  selector: 'mix-compress-image',
  standalone: true,
  imports: [CommonModule, TippyDirective],
  templateUrl: './compress-image.component.html',
  styleUrls: ['./compress-image.component.scss'],
  providers: [TuiDestroyService],
})
export class CompressImageComponent implements AfterViewInit {
  @ViewChild('canvas') canvasEl!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2', { static: false })
  canvas2El!: ElementRef<HTMLCanvasElement>;

  @Input() public set src(v: string | null) {
    this._src = v || '';
    this.loadData();
  }

  public get src() {
    return this._src;
  }

  public httpClient = inject(HttpClient);
  public destroy$ = inject(TuiDestroyService);
  public loading = signal(true);
  public image = new Image();

  private _src!: string;

  async ngAfterViewInit() {
    this.loadData();
  }

  public loadData() {
    if (!this.canvasEl) return;

    this.loading.set(true);
    const canvas = this.canvasEl.nativeElement;
    const ctx = this.canvasEl.nativeElement.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    this.image.addEventListener(
      'load',
      () => {
        this.scaleImage(this.image, this.canvasEl.nativeElement);
        this.loading.set(false);
      },
      false
    );

    this.image.addEventListener(
      'error',
      () => {
        this.image.src = 'assets/images/image_placeholder.jpg';
      },
      false
    );

    this.image.src = this.src!;
  }

  public scaleImage(image: HTMLImageElement, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const imageAspectRatio = image.width / image.height;
    const canvasAspectRatio = canvas.width / canvas.height;
    let sourceX, sourceY, sourceWidth, sourceHeight;

    if (imageAspectRatio > canvasAspectRatio) {
      sourceWidth = image.height * canvasAspectRatio;
      sourceHeight = image.height;
      sourceX = (image.width - sourceWidth) / 2;
      sourceY = 0;
    } else {
      sourceWidth = image.width;
      sourceHeight = image.width / canvasAspectRatio;
      sourceX = 0;
      sourceY = (image.height - sourceHeight) / 2;
    }

    const destWidth: number = canvas.width;
    const destHeight: number = canvas.height;

    ctx?.drawImage(
      image,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      destWidth,
      destHeight
    );
  }

  public showPreview(show: boolean) {
    if (this.loading()) return;

    if (show) {
      setTimeout(() => {
        if (this.canvas2El) {
          this.scaleImage(this.image, this.canvas2El.nativeElement);
        }
      }, 100);
    }
  }
}
