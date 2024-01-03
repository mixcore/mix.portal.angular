import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { BaseTextControl } from '@mixcore/ui/base-control';
import { TuiDestroyService, TuiFocusableElementAccessor } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [TuiDestroyService],
  encapsulation: ViewEncapsulation.None,
})
export class MixInputComponent
  extends BaseTextControl
  implements ControlValueAccessor, OnInit, TuiFocusableElementAccessor
{
  @Output()
  readonly focusedChange = new EventEmitter<boolean>();
  @ViewChild('input') public textField!: ElementRef<HTMLInputElement>;
  focused: boolean = true;
  get nativeFocusableElement() {
    return this.textField.nativeElement;
  }
  destroy$ = inject(TuiDestroyService);

  @Input() type = 'text';
  @Input() override placeHolder = 'Type';
  @Input() size: 'm' | 's' | 'l' = 'm';
  @Input() floatingLabel = false;
  @Input() searchIcon = false;
  @Input() autoCompleteItems: string[] = [];
  @Input() autocomplete = '';
  @Input() name = '';
  @Input() id = '';
  @Input() autofill = '';
  @Input() closable = true;

  @Input() selfControl = false;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  public focus() {
    this.textField.nativeElement.focus({ preventScroll: true });
  }

  ngOnInit() {
    if (this.selfControl) this.defaultControl.setValue(this.value);
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.valueChange.emit(v);
    });
  }
}
