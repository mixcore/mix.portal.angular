import { Injectable, inject } from '@angular/core';
import { MixApiFacadeService } from '@mixcore/share/api';
import { toastObserverProcessing } from '@mixcore/share/helper';
import { UserInfoStore } from '@mixcore/share/stores';
import { ModalService } from '@mixcore/ui/modal';
import { HotToastService } from '@ngneat/hot-toast';
import { UserStore } from '../../stores/user.store';

@Injectable()
export class UserService {
  public api = inject(MixApiFacadeService);
  public toast = inject(HotToastService);
  public modal = inject(ModalService);
  public userStore = inject(UserStore);
  public userInfoStore = inject(UserInfoStore);

  public deleteUser(userId: string) {
    this.modal.asKForAction('Are you sure to delete this user?', () => {
      this.api.accountApi
        .removeUser(userId)
        .pipe(toastObserverProcessing(this.toast))
        .subscribe({
          next: () => {
            this.userStore.reload();
            this.userInfoStore.reload();
          },
        });
    });
  }
}
