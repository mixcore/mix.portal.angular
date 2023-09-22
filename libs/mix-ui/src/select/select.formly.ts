import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixSelectComponent } from './select.component';

@Component({
  selector: 'mix-formly-input',
  template: `
    <mix-formly-control-layout
      [title]="field.props.label"
      [description]="field.type?.toString()"
    >
      <mix-select
        [items]="field.props['allowedValues']"
        [placeHolder]="'Input ' + field.props.label"
        [formControl]="formControl"
        [formlyAttributes]="field"
      ></mix-select>
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixSelectComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlySelectComponent extends FieldType<FieldTypeConfig> {}
