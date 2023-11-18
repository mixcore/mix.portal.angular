import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MixDatabase, MixRelationShip } from '@mixcore/lib/model';
import { SuccessFilter } from '@mixcore/share/base';
import { ArrayUtil } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { DatabaseStore } from 'apps/mix-cms/src/app/stores/database.store';
import { debounceTime, filter, take } from 'rxjs';

@Component({
  selector: 'mix-database-relationship-record',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixInputComponent,
    MixSelectComponent,
    DragDropModule,
    ReactiveFormsModule,
  ],
  templateUrl: './database-relationship-record.component.html',
  styleUrls: ['./database-relationship-record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseRelationshipRecordComponent {
  @Output() public delete = new EventEmitter();
  @Output() public valueChange = new EventEmitter();
  @Input() public value!: Partial<MixRelationShip>;
  public databaseStore = inject(DatabaseStore);
  public allDatabaseIds: number[] = [];
  public allDbDict: Record<number, MixDatabase> = {};
  public form = inject(FormBuilder).group({
    displayName: ['', Validators.required],
    childId: [<number | undefined>undefined, Validators.required],
  });

  public labelProcess = (dbId: number) => {
    return this.allDbDict[dbId]?.displayName || '';
  };

  constructor() {
    this.databaseStore.vm$
      .pipe(takeUntilDestroyed(), filter(SuccessFilter), take(1))
      .subscribe((v) => {
        this.allDatabaseIds = v.data.map((x) => x.id);
        this.allDbDict = ArrayUtil.toRecord(v.data, 'id');
      });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(), debounceTime(200))
      .subscribe((value) => {
        this.value.displayName = value.displayName ?? '';

        if (value.childId != undefined) {
          this.value.childId = value.childId as number | undefined;
          this.value.destinateDatabaseName =
            this.allDbDict[value.childId].systemName;
        }

        this.valueChange.emit(this.value);
      });
  }

  ngOnInit() {
    this.form.patchValue(this.value, { emitEvent: false });
  }
}
