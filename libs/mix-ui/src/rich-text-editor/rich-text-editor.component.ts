import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, signal } from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { MixButtonComponent } from '@mixcore/ui/button';
import {
  TUI_EDITOR_EXTENSIONS,
  TUI_EDITOR_PROVIDERS,
  TuiEditorComponent,
  TuiEditorModule,
  TuiEditorSocketModule,
  defaultEditorExtensions,
} from '@taiga-ui/addon-editor';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';

@Component({
  selector: 'mix-rich-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    TuiEditorModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    MixButtonComponent,
    TuiEditorSocketModule,
    TuiAutoFocusModule,
  ],
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [
    {
      provide: TUI_EDITOR_EXTENSIONS,
      useValue: defaultEditorExtensions,
    },
    TUI_EDITOR_PROVIDERS,
  ],
})
export class MixEditorComponent
  extends BaseTextControl
  implements ControlValueAccessor
{
  @ViewChild(TuiEditorComponent, { static: false }) editor!: TuiEditorComponent;
  @Input() override placeHolder = 'Type a text';
  @Input() heightPx = 100;
  public mode = signal<'Edit' | 'View'>('View');
  public zoom = false;

  ngAfterViewInit() {}

  public toggleEditMode(event: MouseEvent) {
    this.editor.focus(event);
  }
}
