import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  InputLabeledComponent,
  RichTextEditorComponent,
  SkeletonLoadingComponent
} from '@mix/mix.ui';
import { MixPostPortalModel } from '@mix-spa/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  FormUtils,
  MixPostApiService
} from '@mix-spa/mix.share';
import { TuiTabsModule } from '@taiga-ui/kit';
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
    ContentDetailContainerComponent,
    TuiTabsModule,
    ReactiveFormsModule,
    InputLabeledComponent,
    RichTextEditorComponent
  ]
})
export class PostDetailComponent extends BaseComponent implements OnInit {
  public activeTabIndex = 0;
  public post!: MixPostPortalModel;
  public form!: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    private postApi: MixPostApiService,
    private fb: FormBuilder
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
          this.form = this.fb.group({
            title: [result.title, [Validators.required]],
            excerpt: [result.excerpt, [Validators.required]],
            content: [result.content, [Validators.required]]
          });

          this.loading$.next(false);
        },
        error: () => {
          this.error$.next(true);
        }
      });
  }

  public savePost(): void {
    if (!this.form || !this.post) return;
    if (!FormUtils.validateForm(this.form)) return;

    const post: MixPostPortalModel = {
      ...this.post,
      ...this.form.getRawValue()
    };

    this.postApi.savePost(post).subscribe({
      next: () => {
        this.showSuccess('Successfully save your post');
      },
      error: () => {
        this.showError('Error, please try again');
      }
    });
  }
}
