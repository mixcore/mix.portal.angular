import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@Component({
  selector: 'mix-detail-template',
  templateUrl: './detail-template.component.html',
  styleUrls: ['./detail-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormsModule, MonacoEditorModule]
})
export class MixDetailTemplateComponent {
  public code = '';
  public codeEditorOptions = {
    theme: 'vs-light',
    language: 'json',
    automaticLayout: true
  };
}
