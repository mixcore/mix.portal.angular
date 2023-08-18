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
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixInputComponent } from '@mixcore/ui/input';
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
  ],
  templateUrl: './database-select.component.html',
  styleUrls: ['./database-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseSelectComponent {
  public store = inject(DatabaseStore);
  public searchText = new FormControl('');

  @Input() public isCreate = false;
  @Input() public selectedItemId?: number;
  @Output() public selectedItemChange = new EventEmitter<string | number>();
}
