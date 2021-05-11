import { Component, OnInit } from '@angular/core';
import {
  cryptoService,
  MixPostPortalViewModel,
  DisplayDirection,
  LocalStorageKeys,
  mixSettingService,
  PostRepository,
  SearchFilter,
} from '@mix-lib';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public postRepo: PostRepository) {}
  params: SearchFilter = {
    keyword: null,
    pageIndex: 0,
    pageSize: 10,
    direction: DisplayDirection.Asc,
  };

  ngOnInit(): void {
    this.initParams();

    this.demoCrypto();

    this.demoPattern();
  }

  demoPattern() {
    console.log('Demo Post Repository');

    this.postRepo.getListModel(this.params).then((resp) => {
      console.log(resp);
    });

    this.postRepo.getSingleModel(1).then((resp) => {
      if (resp) {
        // Declare viewmodel from model
        let p: MixPostPortalViewModel = null;
        p = new MixPostPortalViewModel(resp);

        // Binding or update data in view then call update to save model
        p.title = 'test';
        p.update();
        console.log(p);
      }
    });
  }
  demoCrypto() {
    console.log('Demo crypto service');
    console.log(
      cryptoService.encryptAES(
        'test 123',
        'MFBud2srMG1IYWRBakZ6dmFMR0RTQT09LG14UDBYc0ZHUGZRc29pYmVJODFyWUZ2OGVZWWdJRFJ0U28wL1phV0FEeGs9'
      ),
      cryptoService.decryptAES(
        'U2FsdGVkX1/fxVSws7TaVP7G7okuWQrsh7Htyf7zGp8=',
        'MFBud2srMG1IYWRBakZ6dmFMR0RTQT09LG14UDBYc0ZHUGZRc29pYmVJODFyWUZ2OGVZWWdJRFJ0U28wL1phV0FEeGs9'
      )
    );
  }
  initParams() {
    console.log('Init Mix Params');
    localStorage.setItem(
      LocalStorageKeys.CONF_APP_URL,
      'https://store.mixcore.org/api/v1'
    );
    localStorage.setItem(LocalStorageKeys.CONF_CURRENT_CULTURE, 'en-us');
    mixSettingService.getAllSettings('en-us');
  }
}
