import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { MixColumn } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { DatabaseStore } from '@mixcore/share/stores';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { ModalService } from '@mixcore/ui/modal';
import { HotToastService } from '@ngneat/hot-toast';
import { EntityFormComponent } from 'apps/mix-cms/src/app/components/entity-form/entity-form.component';

@Component({
  selector: 'mix-database-entity',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixInputComponent,
    DragDropModule,
    EntityFormComponent,
  ],
  templateUrl: './database-entity.component.html',
  styleUrls: ['./database-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseEntityComponent {
  public toast = inject(HotToastService);
  public router = inject(Router);
  public databaseStore = inject(DatabaseStore);
  public modal = inject(ModalService);
  public cdr = inject(ChangeDetectorRef);
  public mixApi = inject(MixApiFacadeService);

  @Input() public columns: MixColumn[] = [];
  @Output() public columnsChange = new EventEmitter<MixColumn[]>();

  public addNewEntity(): void {
    if (!this.columns?.length) {
      this.columns = [new MixColumn({ new: true, priority: 0 })];
    } else {
      const priority =
        Math.max(...this.columns.map((x) => x.priority || 0)) + 1;
      this.columns.push(new MixColumn({ new: true, priority: priority }));
    }

    this.columnsChange.emit(this.columns);
  }

  public removeEntity(entity: MixColumn, index: number) {
    const toDeleteData = this.columns[index];
    if (toDeleteData.id >= 0 && !toDeleteData.new) {
      this.modal.asKForAction('Are you sure to remove this column?', () => {
        this.mixApi.databaseApi
          .deleteDbColumn(toDeleteData.id)
          .pipe(toastObserverProcessing(this.toast))
          .subscribe({
            next: () => {
              this.columns.splice(index, 1);
              this.cdr.detectChanges();
            },
          });
      });
    } else {
      this.columns.splice(index, 1);
    }

    this.columnsChange.emit(this.columns);
  }

  public entityChange(entity: MixColumn, index: number) {
    this.columns[index] = {
      ...this.columns[index],
      ...entity,
    };

    this.columnsChange.emit(this.columns);
  }

  public drop(event: CdkDragDrop<MixColumn[]>) {
    if (this.columns) {
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);

      this.columns = this.columns.map((x, index) => ({
        ...x,
        priority: index,
      }));

      this.columnsChange.emit(this.columns);
      this.cdr.detectChanges();
    }
  }
}
