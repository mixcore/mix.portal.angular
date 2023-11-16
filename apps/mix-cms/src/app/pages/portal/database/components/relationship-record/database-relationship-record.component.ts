import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';

@Component({
  selector: 'mix-database-relationship-record',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixInputComponent,
    DragDropModule,
  ],
  templateUrl: './database-relationship-record.component.html',
  styleUrls: ['./database-relationship-record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseRelationshipRecordComponent {}
