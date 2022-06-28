import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MixPostPortalModel } from '@mix-spa/mix.lib';
import { TuiAlertService } from '@taiga-ui/core';
import { slideAnimation } from 'libs/mix.share/src/animations';
import { switchMap } from 'rxjs';

import {
  MixPostApiService,
  PortalSidebarControlService
} from '../../../services';
import { ShareModule } from '../../../share.module';
import { FormUtils } from '../../../utils';

export type MixCreationType = 'Post' | 'Page' | 'Module';

@Component({
  selector: 'mix-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss'],
  standalone: true,
  imports: [ShareModule],
  animations: [slideAnimation]
})
export class CreationDialogComponent {
  @Input() public type: MixCreationType = 'Post';
  public items: MixCreationType[] = ['Post', 'Page', 'Module'];
  public form: FormGroup = new FormGroup({
    title: new FormControl('Your content title', Validators.required),
    excerpt: new FormControl(''),
    description: new FormControl('')
  });
  public goToPostAfterCreate = true;
  public closeDialogAfterCreate = true;
  public loading = false;
  public initialize = false;
  public activeTabIndex = 0;
  public showRightSideMenu = true;

  constructor(
    public postApi: MixPostApiService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    @Inject(PortalSidebarControlService)
    private readonly sidebarControl: PortalSidebarControlService
  ) {}

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
        this.alertService
          .open(`Create ${this.form.value.title} successfully`, {
            label: 'Success'
          })
          .subscribe();
        this.handleAfterCreate();
      });
  }

  public handleAfterCreate(): void {
    this.loading = false;
  }

  public closeSidebar(): void {
    this.sidebarControl.removeAll();
  }
}
