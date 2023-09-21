import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
import { SkeletonLoadingComponent } from '@mixcore/ui/skeleton';
import { CMS_ROUTES } from '../../app.routes';
import { DatabaseStore } from '../../stores/database.store';
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
  public store = inject(DatabaseStore);
  public router = inject(Router);

  public searchText = new FormControl('');

  @Input() public prefix = '';
  @Input() public isCreate = false;
  @Input() public selectedItemId?: number;
  @Input() public selectedItemName?: string;
  @Output() public selectedItemChange = new EventEmitter<MixDatabase>();

  public selectDb(mixDb: MixDatabase) {
    this.selectedItemId = mixDb.id;
    this.selectedItemChange.emit(mixDb);
  }

  public createDb() {
    this.isCreate = true;
    this.selectedItemId = undefined;

    this.router.navigateByUrl(`${CMS_ROUTES.portal.database.fullPath}/create`);
  }
}
