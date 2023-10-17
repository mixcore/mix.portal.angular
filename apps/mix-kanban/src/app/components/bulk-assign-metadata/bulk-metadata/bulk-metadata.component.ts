import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MetadataAsc,
  MetadataModel,
  PaginationModel,
  PaginationRequestModel,
} from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { BaseComponent } from '@mixcore/share/base';
import { MixInputComponent } from '@mixcore/ui/input';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiBooleanHandler, TuiHandler } from '@taiga-ui/cdk';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiFilterModule } from '@taiga-ui/kit';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'mix-bulk-metadata',
  standalone: true,
  imports: [
    CommonModule,
    TuiFilterModule,
    ReactiveFormsModule,
    MixInputComponent,
    TuiLinkModule,
    TuiLoaderModule,
  ],
  templateUrl: './bulk-metadata.component.html',
  styleUrls: ['./bulk-metadata.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BuildMetadataComponent extends BaseComponent implements OnInit {
  public mixApi = inject(MixApiFacadeService);
  public toast = inject(HotToastService);

  @Input() public type: string | undefined = undefined;
  @Output() public selectedMetadataChange: EventEmitter<string[]> =
    new EventEmitter();

  public pageSize = 50;
  public query = signal<PaginationRequestModel>({
    pageIndex: 0,
    pageSize: this.pageSize,
    direction: 'Desc',
  });
  public pageInfo = signal<PaginationModel>({
    pageIndex: 0,
    pageSize: 50,
    totalPage: 0,
  });
  public filterOptions = signal<string[]>([]);
  public filterDisplayName: Record<string, string> = {};
  public metadata: MetadataModel[] = [];
  public metadataAsc: MetadataAsc[] = [];
  public defaultForm = new FormControl();
  public form = new FormControl();
  public searchForm = new FormControl();

  constructor() {
    super();

    effect(
      () => {
        this.loadData(this.query());
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.loadData(this.query());

    this.form.valueChanges.subscribe((values: string[]) => {
      const currentValues = values;
      const oldValues: string[] = this.defaultForm.getRawValue() ?? [];
      const toUpdateValues = currentValues.filter(
        (x) => !oldValues.includes(x)
      );

      this.selectedMetadataChange.emit(toUpdateValues);
      this.defaultForm.setValue(currentValues);
    });

    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe((a) => {
      this.loadData(this.query());
    });
  }

  public loadData(request: PaginationRequestModel) {
    if (!this.type) return;

    this.mixApi.metadataApi
      .getMetadata({
        ...request,
        metadataType: this.type,
        keyword: this.searchForm.getRawValue() || '',
        searchColumns: ['Content', 'SeoContent'],
        searchMethod: 'Like',
      })
      .pipe(this.observerLoadingStateSignal())
      .subscribe({
        next: (v) => {
          this.metadata = v.items;
          this.filterOptions.set(this.metadata.map((x) => x.id.toString()));
          this.metadata.forEach((m) => {
            this.filterDisplayName[m.id.toString()] = m.content;
          });

          this.pageInfo.set(v.pagingData);
        },
      });
  }

  public changePageSize(): void {
    this.query.update((s) => ({
      ...s,
      pageSize: (s.pageSize ?? 0) + this.pageSize,
    }));
  }

  public badgeHandler: TuiHandler<string, number> = () => 0;
  public disabledItemHandler: TuiBooleanHandler<string> = (item) =>
    this.form?.value?.includes(item);
}
