import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MixColumn } from '@mixcore/lib/model';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixTextAreaComponent } from '@mixcore/ui/textarea';
import { DialogRef } from '@ngneat/dialog';
import { GridStack, GridStackOptions, GridStackWidget } from 'gridstack';
import { GridstackModule } from 'gridstack/dist/angular';
import { groupBy } from 'remeda';

@Component({
  selector: 'mix-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    GridstackModule,
    CommonModule,
    MixInputComponent,
    MixTextAreaComponent,
  ],
})
export class FormEditorComponent {
  @Input() columns: Record<string, MixColumn[]> = {};
  public dataTypes: string[] = [];
  public dialogRef = inject(DialogRef);

  public gridOptions: GridStackOptions = {
    margin: 5,
    minRow: 2,
    cellHeight: 80,
    acceptWidgets: true,
  };

  public items: GridStackWidget[] = [
    { x: 0, y: 0, w: 6, id: '1' },
    { x: 6, y: 0, w: 6, id: '2' },
    { x: 0, y: 1, w: 6, id: '3' },
  ];

  constructor() {
    this.columns = groupBy(
      this.dialogRef.data['columns'] as MixColumn[],
      (x) => x.dataType
    );

    this.dataTypes = Object.keys(this.columns);
  }

  public identify(index: number, w: GridStackWidget) {
    return w.id;
  }

  public ngAfterViewInit() {
    GridStack.setupDragIn('.sidebar .grid-stack-item', {
      appendTo: 'body',
      helper: 'clone',
    });
  }
}
