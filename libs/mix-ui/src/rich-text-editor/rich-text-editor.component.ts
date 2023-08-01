import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import {
  TUI_EDITOR_EXTENSIONS,
  TuiEditorModule,
  defaultEditorExtensions,
} from '@taiga-ui/addon-editor';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { BaseTextControl } from '../base/base-text.control';
import { MixButtonComponent } from '../button';

@Component({
  selector: 'mix-rich-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    TuiEditorModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    MixButtonComponent,
  ],
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
  ],
})
export class MixEditorComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @Input() override placeHolder = 'Type a text';
  @Input() heightPx = 100;

  zoom = false;
}
