import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { TuiEditorNewModule } from '@taiga-ui/addon-editor';
import { TuiLabelModule } from '@taiga-ui/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mix-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiEditorNewModule, FormsModule, TuiLabelModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RichTextEditorComponent,
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements ControlValueAccessor {
  @Input() public disabled = false;
  @Input() public label = '';
  public value = '';
  public value$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.value
  );

  public onChange = (value: string) => value;
  public onTouch = () => undefined;

  public writeValue(value: string): void {
    this.value = value;
    this.value$.next(value);
  }

  public registerOnChange(fn: (value: string) => string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => undefined): void {
    this.onTouch = fn;
  }

  public onValueChange(value: string): void {
    this.value = value;
    this.value$.next(value);
    this.onChange(value);
    this.onTouch();
  }
}
