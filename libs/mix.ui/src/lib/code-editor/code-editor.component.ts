import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'mix-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CodeEditorComponent,
      multi: true
    }
  ]
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {
  @Input() public code = '';
  @Input() public language = 'razor';
  @Output() public codeChange: EventEmitter<string> =
    new EventEmitter<string>();
  public templateOption = {};
  public code$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.code
  );

  public onChange = (value: string) => value;
  public onTouch = () => undefined;

  public ngOnInit(): void {
    this.templateOption = {
      theme: 'vs',
      automaticLayout: true,
      language: 'razor'
    };
  }

  public onCodeChange(value: string): void {
    this.code = value;
    this.code$.next(value);
    this.codeChange.emit(value);
    this.onChange(value);
    this.onTouch();
  }

  public writeValue(value: string): void {
    this.code = value;
    this.code$.next(value);
  }

  public registerOnChange(fn: (value: string) => string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => undefined): void {
    this.onTouch = fn;
  }
}
