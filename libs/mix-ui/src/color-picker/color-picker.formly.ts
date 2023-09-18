import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyControlLayoutComponent } from '../base/formly-control-layout/formly-control-layout.component';
import { MixColorPickerComponent } from './color-picker.component';

@Component({
  selector: 'mix-formly-color-picker',
  template: `
    <mix-formly-control-layout [title]="field.props.label" [description]="field.type?.toString()">
      <mix-color-picker
            [placeHolder]="'Choose ' + field.props.label + ' color'"
            [formControl]="formControl"
            [formlyAttributes]="field"
      />
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixColorPickerComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
})
export class MixFormlyColorPickerComponent extends FieldType<FieldTypeConfig> {}
