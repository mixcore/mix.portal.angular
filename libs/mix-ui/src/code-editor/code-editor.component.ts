import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule, ReactiveFormsModule],
  providers: [
    TuiDestroyService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CodeEditorComponent,
      multi: true,
    },
  ],
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {
  @Input() public set disabled(value: boolean) {
    value ? this.form.disable() : this.form.enable();
  }
  @Input() public language = 'razor';

  @Output() public codeChange: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() public codeSave: EventEmitter<void> = new EventEmitter<void>();

  public templateOption = {};
  public form: FormControl = new FormControl('');

  constructor(private destroy$: TuiDestroyService) {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        this.codeSave.emit();
      }
    });
  }

  public onChange = (value: string) => value;
  public onTouch = () => undefined;

  public ngOnInit(): void {
    this.templateOption = {
      theme: 'vs',
      automaticLayout: true,
      language: 'razor',
    };
  }

  public onCodeChange(value: string): void {
    this.codeChange.emit(value);
    this.onChange(value);
    this.onTouch();
  }

  public writeValue(value: string): void {
    this.form.patchValue(value);
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => this.onCodeChange(v));
  }

  public registerOnChange(fn: (value: string) => string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => undefined): void {
    this.onTouch = fn;
  }
}
