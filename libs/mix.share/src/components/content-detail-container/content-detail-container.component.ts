import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiToggleModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-content-detail-container',
  templateUrl: './content-detail-container.component.html',
  styleUrls: ['./content-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButtonModule, TuiToggleModule]
})
export class ContentDetailContainerComponent implements OnInit {
  public autoSave: FormControl = new FormControl(true);

  @Output() public autoSaveChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() public save: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
    this.autoSave.valueChanges.subscribe((v: boolean) =>
      this.autoSaveChange.emit(v)
    );
  }

  public onSave(): void {
    this.save.emit();
  }
}
