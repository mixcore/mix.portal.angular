import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeletonLoadingComponent } from '@mix/mix.ui';
import { MixPostPortalModel } from '@mix-spa/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  MixPostApiService
} from '@mix-spa/mix.share';
import { delay } from 'rxjs';

@Component({
  selector: 'mix-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    SkeletonLoadingComponent,
    ContentDetailContainerComponent
  ]
})
export class PostDetailComponent extends BaseComponent implements OnInit {
  public post!: MixPostPortalModel;

  constructor(
    public activatedRoute: ActivatedRoute,
    private postApi: MixPostApiService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.postApi
      .getPostById(this.activatedRoute.snapshot.params['id'])
      .pipe(delay(1000))
      .subscribe({
        next: result => {
          this.post = result;
          this.loading$.next(false);
        },
        error: () => {
          this.error$.next(true);
        }
      });
  }
}
