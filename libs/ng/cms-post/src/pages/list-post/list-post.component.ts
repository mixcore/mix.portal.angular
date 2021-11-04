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
    mixSettingService.getAllSettings();
    this.demoCrypto();

    this.demoPattern();
  }

  demoPattern() {
    this.postRepo.getSingleModel(1).then(resp => {
      if (resp) {
        // // Declare viewmodel from model
        // let p: MixPostPortalViewModel;
        // p = new MixPostPortalViewModel(resp);

        // // Binding or update data in view then call update to save model
        // p.title = 'test';
        // p.update();
        console.log(resp);
      }
    });
  }
  demoCrypto() {
    let text = 'Demo crypto service';
    let key = 'MFBud2srMG1IYWRBakZ6dmFMR0RTQT09LG14UDBYc0ZHUGZRc29pYmVJODFyWUZ2OGVZWWdJRFJ0U28wL1phV0FEeGs9';
    console.log('text:' + text);
    let encrypted = cryptoService.encryptAES(text, key);
    console.warn(encrypted);
    console.error('result: ', cryptoService.decryptAES(encrypted, key));
  }
  initParams() {
    this.postRepo.setBaseURL('https://localhost:5010/api/v2/rest/mix-portal');
    this.postRepo.setLanguage('en-us');
  }
}
