import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MixProject } from '@mixcore/lib/model';
import { TippyDirective } from '@ngneat/helipopper';
import { tuiPure } from '@taiga-ui/cdk';
import { ProjectStore } from '../../store/project.store';

@Component({
  selector: 'mix-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TippyDirective],
})
export class ProjectSelectComponent {
  public store = inject(ProjectStore);
  public project = signal<MixProject[]>([]);

  @Input() public selectedItemId?: number;
  @Input() public selectedItemName?: string;
  @Output() public selectedItemChange = new EventEmitter<MixProject>();

  constructor() {
    this.store.vm$.pipe(takeUntilDestroyed()).subscribe((vm) => {
      this.project.set(vm.data);

      if (vm.data.length && !this.selectedItemId) {
        this.selectItem(vm.data[0]);
      }
    });
  }

  @tuiPure
  public getSelectedProjectName(db: MixProject[], selectedItemId?: number) {
    return db.find((x) => x.id === selectedItemId);
  }

  public selectItem(mixDb: MixProject) {
    this.selectedItemId = mixDb.id;
    this.selectedItemChange.emit(mixDb);
  }
}
