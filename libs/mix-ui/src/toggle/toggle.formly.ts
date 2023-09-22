import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
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
