import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@Component({
  selector: 'mix-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule]
})
export class CodeEditorComponent implements OnInit {
  @Input() public code = '';
  @Input() public language = 'razor';
  @Output() public codeChange: EventEmitter<string> =
    new EventEmitter<string>();

  public templateOption = {};

  public ngOnInit(): void {
    this.templateOption = {
      theme: 'vs',
      automaticLayout: true,
      language: 'razor'
    };
  }

  public onCodeChange(value: string): void {
    this.code = value;
    this.codeChange.emit(value);
  }
}
