import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MixDatabase, MixRelationShip } from '@mixcore/lib/model';
import { ArrayUtil } from '@mixcore/share/form';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { MixSelectComponent } from '@mixcore/ui/select';
import { DatabaseStore } from 'apps/mix-cms/src/app/stores/database.store';
import { filter } from 'rxjs';

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
  @Input() public value!: Partial<MixRelationShip>;
  public databaseStore = inject(DatabaseStore);

  public allDatabaseIds: number[] = [];
  public allDatabaseDict: Record<number, MixDatabase> = {};
  public form = inject(FormBuilder).group({
    displayName: ['', Validators.required],
    parentId: [<number | undefined>undefined, Validators.required],
  });

  public labelProcess = (dbId: number) => {
    return this.allDatabaseDict[dbId].displayName;
  };

  constructor() {
    this.databaseStore.vm$
      .pipe(
        takeUntilDestroyed(),
        filter((s) => s.status === 'Success')
      )
      .subscribe((v) => {
        this.allDatabaseIds = v.data.map((x) => x.id);
        this.allDatabaseDict = ArrayUtil.toRecord(v.data, 'id');
      });
  }

  ngOnInit() {
    this.form.patchValue(this.value);
  }
}
