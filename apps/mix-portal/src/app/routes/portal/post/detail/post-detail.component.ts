import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkeletonLoadingComponent } from '@mix/mix.ui';
import {
  BaseComponent,
  ContentDetailContainerComponent
} from '@mix-spa/mix.share';

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
  constructor(public activatedRoute: ActivatedRoute) {
    super();
  }

  public ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id']);
  }
}
