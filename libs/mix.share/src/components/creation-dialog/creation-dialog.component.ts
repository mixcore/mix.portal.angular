import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MixPostPortalModel } from '@mix-spa/mix.lib';
import { TuiAlertService, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { switchMap } from 'rxjs';

import { MixPostApiService } from '../../services';
import { ShareModule } from '../../share.module';
import { FormUtils } from '../../utils';

export type MixCreationType = 'Post' | 'Page' | 'Module';

@Component({
  selector: 'mix-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class CreationDialogComponent implements OnInit {
  @Input() public type: MixCreationType = 'Post';
  public items: MixCreationType[] = ['Post', 'Page', 'Module'];
  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    excerpt: new FormControl(''),
    description: new FormControl('')
  });
  public goToPostAfterCreate = true;
  public closeDialogAfterCreate = true;
  public loading = false;
  public initialize = false;

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private context: TuiDialogContext<void, 'Post' | 'Page' | 'Module'>,
    public postApi: MixPostApiService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {
    this.type = context.data;
  }

  public ngOnInit(): void {
    this.initialize = true;
    // setTimeout(() => (this.initialize = true), 200);
  }

  public submitForm(): void {
    if (!FormUtils.validateForm(this.form)) return;

    switch (this.type) {
      case 'Post':
        this.createNewPost();
    }
  }

  public createNewPost(): void {
    this.loading = true;
    this.postApi
      .getDefaultPostTemplate()
      .pipe(
        switchMap(result => {
          const post = <MixPostPortalModel>{
            ...result,
            title: this.form.value['title'],
            excerpt: this.form.value['excerpt'],
            content: this.form.value['description']
          };

          return this.postApi.savePost(post);
        })
      )
      .subscribe(() => {
        this.alertService.open(`Create ${this.form.value.title} successfully`, { label: 'Success' }).subscribe();
        this.handleAfterCreate();
      });
  }

  public handleAfterCreate(): void {
    this.loading = false;
  }
}
