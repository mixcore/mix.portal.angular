import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixUploadComponent } from './upload.component';

@Component({
  selector: 'mix-formly-upload',
  template: `
    <div class="row mb-4">
      <div class="col-md-2" col-12>
        <span class="content-label"> {{ field.props.label }}:</span>
        <div class="content-sub-label">{{ field.type }}</div>
      </div>

      <div class="col-md-6 col-12">
        <mix-upload
          [formControl]="formControl"
          [formlyAttributes]="field"
          [requestFn]="field.props['uploadFn']"
          [deleteFn]="field.props['deleteFileFn']"
        ></mix-upload>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixUploadComponent,
    CommonModule,
  ],
})
export class MixFormlyUploadComponent extends FieldType<FieldTypeConfig> {}
