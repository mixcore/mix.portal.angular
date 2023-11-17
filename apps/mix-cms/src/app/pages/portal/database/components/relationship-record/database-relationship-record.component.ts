import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { MixRelationShip } from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { DatabaseStore } from 'apps/mix-cms/src/app/stores/database.store';

@Component({
  selector: 'mix-database-relationship-record',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixInputComponent,
    MixSelectComponent,
    DragDropModule,
  ],
  templateUrl: './database-relationship-record.component.html',
  styleUrls: ['./database-relationship-record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseRelationshipRecordComponent {
  @Input() value!: Partial<MixRelationShip>;
  public databaseStore = inject(DatabaseStore);
}
