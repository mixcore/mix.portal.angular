import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixArrayMediaComponent } from './array-media.component';

@Component({
  selector: 'mix-array-media-formly',
  template: `
  <div class="row mb-4">
    <div class="col-md-2">
      <span class="content-label mb-1"> {{ field.props.label }}:</span>
      <div class="content-sub-label">{{ field.type }}</div>
    </div>

      <div class="col-md-10">
        <mix-array-media
        [formControl]="formControl"
        [requestFn]="field.props['uploadFn']"
        [deleteFn]="field.props['deleteFileFn']"
        [formlyAttributes]="field"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixArrayMediaComponent,
    CommonModule,
  ],
})
export class MixFormlyArrayMediaComponent extends FieldType<FieldTypeConfig> {}
