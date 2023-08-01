import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { MixPost } from '@mixcore/lib/model';
import { MixApiFacadeService } from '@mixcore/share/api';
import { HotToastService } from '@ngneat/hot-toast';
import { TuiLoaderModule } from '@taiga-ui/core';
import { catchError, forkJoin, of } from 'rxjs';
import { BuildMetadataComponent } from './bulk-metadata/bulk-metadata.component';

@Component({
  selector: 'mix-bulk-assign-metadata',
  standalone: true,
  imports: [CommonModule, BuildMetadataComponent, TuiLoaderModule],
  templateUrl: './bulk-assign-metadata.component.html',
  styleUrls: ['./bulk-assign-metadata.component.scss'],
})
export class BulkAssignMetadataComponent {
  @Input() public posts: MixPost[] = [];

  mixApi = inject(MixApiFacadeService);
  toast = inject(HotToastService);

  metadataAllowedType = signal<string[]>([]);
  showLoading = signal(false);

  constructor() {
    this.loadDbData();
  }

  loadDbData(): void {
    this.mixApi.databaseApi.getDatabaseBySystemName('Metadata').subscribe({
      next: (metadataDb) => {
        this.metadataAllowedType.set(
          metadataDb.columns?.find((c) => c.systemName === 'type')
            ?.columnConfigurations.allowedValues ?? []
        );
      },
    });
  }

  selectedMetadataChange(v: any) {
    this.showLoading.set(true);

    this.createAssociation(v);
  }

  public createAssociation(value: string[]) {
    if (!value.length) return;

    const request = this.posts.map((post) => {
      return this.mixApi.metadataApi
        .createMetadataAsc(post.id, 'Post', '', '', parseInt(value[0]))
        .pipe(catchError((error) => of(error)));
    });

    forkJoin(request)
      .pipe(
        this.toast.observe({
          loading: 'Processing',
          success: 'Successfully apply your changes',
        })
      )
      .subscribe(() => {
        this.showLoading.set(false);
      });
  }
}
