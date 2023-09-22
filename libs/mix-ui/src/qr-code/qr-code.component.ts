import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { MixButtonComponent } from '@mixcore/ui/button';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { QRCodeModule } from 'angularx-qrcode';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-qr-code',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    ReactiveFormsModule,
    QRCodeModule,
    MixButtonComponent,
  ],
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  providers: [TuiDestroyService],
})
export class MixQRCodeComponent
  extends BaseTextControl
  implements ControlValueAccessor, OnInit
{
  destroy$ = inject(TuiDestroyService);

  @Input() type = 'text';
  @Input() override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() floatingLabel = false;
  @Input() searchIcon = false;

  @Input() selfControl = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  ngOnInit() {
    if (this.selfControl) this.defaultControl.setValue(this.value);
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.valueChange.emit(v);
    });
  }

  saveAsImage(parent: any) {
    let parentElement = null;
    parentElement = parent.qrcElement.nativeElement
      .querySelector('canvas')
      .toDataURL('image/png');

    if (parentElement) {
      const blobData = this.convertBase64ToBlob(parentElement);
      const blob = new Blob([blobData], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Qrcode';
      link.click();
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    const parts = Base64Image.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
  }
}
