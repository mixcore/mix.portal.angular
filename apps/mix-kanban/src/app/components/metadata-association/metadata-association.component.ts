import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
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
import { BaseComponent, LoadingState } from '@mixcore/share/base';
import { MixInputComponent } from '@mixcore/ui/input';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiHandler } from '@taiga-ui/cdk';
import { TuiLinkModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiFilterModule } from '@taiga-ui/kit';
import { debounceTime, forkJoin } from 'rxjs';

@Component({
  selector: 'mix-metadata-association',
  standalone: true,
  imports: [
    CommonModule,
    TuiFilterModule,
    ReactiveFormsModule,
    MixInputComponent,
    TuiLinkModule,
    TuiLoaderModule,
  ],
  templateUrl: './metadata-association.component.html',
  styleUrls: ['./metadata-association.component.scss'],
})
export class MetadataAssociationComponent
  extends BaseComponent
  implements OnInit
{
  public mixApi = inject(MixApiFacadeService);
  public toast = inject(HotToastService);


  @Input() public type: string | undefined = undefined;
  @Input() public postId = 0;
  @Input() public contentType = 'Post';
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

      const toRemoveValues = oldValues.filter(
        (x) => !currentValues.includes(x)
      );

      this.createAssociation(toUpdateValues);
      this.deleteAssociation(toRemoveValues);

      this.defaultForm.setValue(currentValues);
    });

    this.searchForm.valueChanges.pipe(debounceTime(300)).subscribe((a) => {
      this.loadData(this.query());
    });
  }

  public createAssociation(value: string[]) {
    if (!value.length || !this.type) return;

    const requests = this.metadata
      .filter((x) => value.includes(x.id.toString()))
      .map((mtd) => {
        return this.mixApi.metadataApi.createMetadataAsc(
          this.postId,
          this.contentType ?? '',
          '',
          '',
          mtd.id
        );
      });

    this.loadingState.set(LoadingState.Loading);
    forkJoin(requests).pipe(
      this.toast.observe({
        success: 'Successfully update metadata',
        error: 'Something error, please try again'
      })
    ).subscribe({
      next: () => {
        this.loadData(this.query());
      },
    });
  }

  public deleteAssociation(value: string[]) {
    if (!value.length) return;

    const requests = this.metadataAsc
      .filter((x) => value.includes(x.metadata.id.toString()))
      .map((mtd) => {
        return this.mixApi.metadataApi.deleteMetadataAsc(mtd.id);
      });

    this.loadingState.set(LoadingState.Loading);
    forkJoin(requests).pipe(
      this.toast.observe({
        success: 'Successfully update metadata',
        error: 'Something error, please try again'
      })
    ).subscribe({
      next: () => {
        this.loadData(this.query());
      },
    });
  }

  public loadData(request: PaginationRequestModel) {
    if (!this.type || !this.postId) return;

    forkJoin([
      this.mixApi.metadataApi.getMetadata({
        ...request,
        metadataType: this.type,
        keyword: this.searchForm.getRawValue() || '',
        searchColumns: ['Content', 'SeoContent'],
        searchMethod: 'Like',
      }),
      this.mixApi.metadataApi.getMetadataByContentType(
        this.contentType,
        this.postId,
        this.type,
        { ...request, pageSize: 100 }
      ),
    ])
      .pipe(this.observerLoadingStateSignal())
      .subscribe({
        next: ([v, a]) => {
          this.metadata = v.items;
          this.filterOptions.set(this.metadata.map((x) => x.id.toString()));
          this.metadata.forEach((m) => {
            this.filterDisplayName[m.id.toString()] = m.content;
          });

          this.pageInfo.set(v.pagingData);

          this.metadataAsc = a.items;
          const selectedMtd = a.items.map((x) => x.metadata.id.toString());
          this.defaultForm.setValue(selectedMtd, { emitEvent: false });
          this.form.setValue(selectedMtd, { emitEvent: false });
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
}
