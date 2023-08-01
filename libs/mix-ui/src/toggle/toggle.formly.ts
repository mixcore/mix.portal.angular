import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixToggleComponent } from './toggle.component';

@Component({
  selector: 'mix-formly-toggle',
  template: `
    <div class="row mb-4">
      <div class="col-md-2" col-12>
        <span class="content-label"> {{ field.props.label }}:</span>
        <div class="content-sub-label">{{ field.type }}</div>
      </div>

      <div class="col-md-10 col-12">
        <mix-toggle
          [formControl]="formControl"
          [formlyAttributes]="field"
        ></mix-toggle>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixToggleComponent,
    CommonModule,
  ],
})
export class MixFormlyToggleComponent extends FieldType<FieldTypeConfig> {}
