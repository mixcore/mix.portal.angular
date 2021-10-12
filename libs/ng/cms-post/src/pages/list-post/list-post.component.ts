import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  DisplayDirection,
  LocalStorageKeys,
  PaginationModel,
  MixPostPortalModel,
  MixPostPortalViewModel,
  PostRepository,
  SearchFilter,
  cryptoService,
  mixSettingService
} from '@mix-lib';

@Component({
  selector: 'list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPostComponent implements OnInit {
  public data: PaginationModel<MixPostPortalModel> = new PaginationModel<MixPostPortalModel>();
  public params: SearchFilter = {
    keyword: undefined,
    pageIndex: 0,
    pageSize: 10,
    direction: DisplayDirection.Asc
  };
  constructor(public postRepo: PostRepository) {}
  ngOnInit(): void {
    this.initParams();

    this.demoCrypto();

    this.demoPattern();
  }

  demoPattern() {
    this.postRepo.getListModel(this.params).then(resp => {
      this.data = resp;
    });

    this.postRepo.getSingleModel(1).then(resp => {
      if (resp) {
        // Declare viewmodel from model
        let p: MixPostPortalViewModel;
        p = new MixPostPortalViewModel(resp);

        // Binding or update data in view then call update to save model
        // p.title = 'test';
        // p.update();
        // console.log(p);
      }
    });
  }
  demoCrypto() {
    console.log('Demo crypto service');
    console.log(
      cryptoService.encryptAES('test 123', 'MFBud2srMG1IYWRBakZ6dmFMR0RTQT09LG14UDBYc0ZHUGZRc29pYmVJODFyWUZ2OGVZWWdJRFJ0U28wL1phV0FEeGs9'),
      cryptoService.decryptAES(
        'U2FsdGVkX1/fxVSws7TaVP7G7okuWQrsh7Htyf7zGp8=',
        'MFBud2srMG1IYWRBakZ6dmFMR0RTQT09LG14UDBYc0ZHUGZRc29pYmVJODFyWUZ2OGVZWWdJRFJ0U28wL1phV0FEeGs9'
      )
    );
  }
  initParams() {
    console.log('Init Mix Params');
    localStorage.setItem(LocalStorageKeys.CONF_APP_URL, 'https://store.mixcore.org/api/v1');
    localStorage.setItem(LocalStorageKeys.CONF_CURRENT_CULTURE, 'en-us');
    mixSettingService.getAllSettings('en-us');
  }
}
