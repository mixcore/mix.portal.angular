import { DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginationRequestModel } from '@mix-spa/mix.lib';
import { BehaviorSubject, switchMap } from 'rxjs';

import { MixModuleApiService } from '../../services/api/mix-module-api.service';
import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-module-select',
  templateUrl: './module-select.component.html',
  styleUrls: ['./module-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, DragDropModule],
  standalone: true
})
export class MixModuleSelectComponent {
  public filter$: BehaviorSubject<PaginationRequestModel> =
    new BehaviorSubject<PaginationRequestModel>({
      pageSize: 10,
      pageIndex: 0,
      keyword: ''
    });

  public data$ = this.filter$.pipe(
    switchMap(filter => this.moduleApi.getModules(filter))
  );

  constructor(private moduleApi: MixModuleApiService) {}
}
