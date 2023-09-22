import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyControlLayoutComponent } from '@mixcore/ui/base-control';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { MixJsonEditorComponent } from './json-editor.component';

@Component({
  selector: 'mix-json-editor-formly',
  standalone: true,
  template: `
    <mix-formly-control-layout [title]="field.props.label" [description]="field.type?.toString()">
      <mix-json-editor
      [formControl]="formControl"
      [formlyAttributes]="field"
    />
    </mix-formly-control-layout>
  `,
  imports: [
    FormlyModule,
    ReactiveFormsModule,
    CommonModule,
    MixJsonEditorComponent,
    FormlyControlLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonEditorFormlyComponent extends FieldType<FieldTypeConfig> {}
