import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixInputNumberComponent } from './input-number.component';

@Component({
  selector: 'mix-formly-input-number',
  template: `
  <mix-formly-control-layout [title]="field.props.label" [description]="field.type?.toString()">
      <mix-input-number
      [placeHolder]="'Input ' + field.props.label"
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
  </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixInputNumberComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyInputNumberComponent extends FieldType<FieldTypeConfig> {}
