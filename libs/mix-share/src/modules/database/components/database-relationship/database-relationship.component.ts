import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MixRelationShip } from '@mixcore/lib/model';
import { ArrayUtil } from '@mixcore/share/form';
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
  @Output() public relationshipChanges = new EventEmitter();
  @Output() public deleteRelation = new EventEmitter();

  public addNewRelation() {
    this.relationships.push({ new: true });
  }

  public onValueChane(value: Partial<MixRelationShip>, index: number) {
    this.relationships[index] = value;
    this.relationshipChanges.emit(this.relationships);
  }

  public onDelete(value: Partial<MixRelationShip>, index: number) {
    if (value.new) {
      this.relationships = ArrayUtil.removeAtIndex(this.relationships, index);
      this.relationshipChanges.emit(this.relationships);
      return;
    }

    this.deleteRelation.emit(value);
  }
}
