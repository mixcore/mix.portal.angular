import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyControlLayoutComponent } from '../base/formly-control-layout/formly-control-layout.component';
import { MixUploadComponent } from './upload.component';

@Component({
  selector: 'mix-formly-upload',
  template: `
    <mix-formly-control-layout
      [title]="field.props.label"
      [description]="field.type?.toString()"
    >
      <mix-upload
        [formControl]="formControl"
        [formlyAttributes]="field"
        [requestFn]="field.props['uploadFn']"
        [deleteFn]="field.props['deleteFileFn']"
      ></mix-upload>
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixUploadComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyUploadComponent extends FieldType<FieldTypeConfig> {}
