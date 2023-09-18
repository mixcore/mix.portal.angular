import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyControlLayoutComponent } from '../base/formly-control-layout/formly-control-layout.component';
import { MixToggleComponent } from './toggle.component';

@Component({
  selector: 'mix-formly-toggle',
  template: `
    <mix-formly-control-layout
      [title]="field.props.label"
      [description]="field.type?.toString()"
    >
      <mix-toggle
        [formControl]="formControl"
        [formlyAttributes]="field"
      ></mix-toggle>
    </mix-formly-control-layout>
  `,
  standalone: true,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    MixToggleComponent,
    CommonModule,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixFormlyToggleComponent extends FieldType<FieldTypeConfig> {}
