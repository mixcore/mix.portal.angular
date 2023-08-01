import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixInputNumberComponent } from './input-number.component';

@Component({
  selector: 'mix-formly-input-number',
  template: `
    <div class="row mb-4">
      <div class="col-md-2">
          <span class="content-label mb-1"> {{ field.props.label }}:</span>
          <div class="content-sub-label">{{ field.type }}</div>
      </div>

      <div class="col-md-10">
          <mix-input-number
          [placeHolder]="'Input ' + field.props.label"
          [formControl]="formControl"
          [formlyAttributes]="field"
        />
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixInputNumberComponent,
    CommonModule,
  ],
})
export class MixFormlyInputNumberComponent extends FieldType<FieldTypeConfig> {}
