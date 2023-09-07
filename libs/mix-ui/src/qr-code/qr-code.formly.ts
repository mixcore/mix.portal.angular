import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyControlLayoutComponent } from '../base/formly-control-layout/formly-control-layout.component';
import { MixQRCodeComponent } from './qr-code.component';

@Component({
  selector: 'mix-formly-qr-code',
  template: `
    <mix-formly-control-layout
      [title]="field.props.label"
      [description]="field.type?.toString()"
    >
      <mix-qr-code
        [type]="field.props.type ?? 'text'"
        [placeHolder]="'Input ' + field.props.label"
        [formControl]="formControl"
        [formlyAttributes]="field"
      ></mix-qr-code>
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixQRCodeComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyQRCodeComponent extends FieldType<FieldTypeConfig> {}
