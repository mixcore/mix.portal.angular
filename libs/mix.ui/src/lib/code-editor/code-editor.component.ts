import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  public templateOption = {};

  public ngOnInit(): void {
    this.templateOption = {
      theme: 'vs',
      automaticLayout: true,
      language: 'razor'
    };
  }
}
