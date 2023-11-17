import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MixRelationShip } from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { DatabaseRelationshipRecordComponent } from '../relationship-record/database-relationship-record.component';

@Component({
  selector: 'mix-database-relationship',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    DatabaseRelationshipRecordComponent,
    DragDropModule,
  ],
  templateUrl: './database-relationship.component.html',
  styleUrls: ['./database-relationship.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DatabaseRelationshipComponent {
  @Input() public relationships: Partial<MixRelationShip>[] = [];

  public addNewRelation() {
    this.relationships.push({ new: true });
  }
}
