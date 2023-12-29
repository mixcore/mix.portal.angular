import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { BaseState } from '@mixcore/share/base';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { MasterDbStore } from '../../store/master-db.store';
import { DatabaseFilterPipe } from './database-filter.pipe';

@Component({
  selector: 'mix-database-select',
  standalone: true,
  imports: [
    CommonModule,
    MixButtonComponent,
    MixInputComponent,
    DatabaseFilterPipe,
    ReactiveFormsModule,
    SkeletonLoadingComponent,
  ],
  templateUrl: './database-select.component.html',
  styleUrls: ['./database-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseSelectComponent {
  public store = inject(MasterDbStore);
  public router = inject(Router);

  public searchText = new FormControl('');
  public state = signal<BaseState<MixDatabase> | undefined>(undefined);

  @Input() public createUrl = `app/database/create`;
  @Input() public prefix = '';
  @Input() public isCreate = false;
  @Input() public selectedItemId?: number;
  @Input() public selectedItemName?: string;
  @Output() public selectedItemChange = new EventEmitter<MixDatabase>();

  constructor() {
    effect(
      () => {
        const state = this.store.stateSignal();
        this.state.set(state);
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.store.stateSignal();
  }

  public selectDb(mixDb: MixDatabase) {
    this.selectedItemId = mixDb.id;
    this.selectedItemChange.emit(mixDb);
  }

  public createDb() {
    this.isCreate = true;
    this.selectedItemId = undefined;

    this.router.navigateByUrl(this.createUrl);
  }
}
