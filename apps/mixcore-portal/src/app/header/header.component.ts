import { Component, OnInit } from '@angular/core';
import {
  cryptoService,
  DisplayDirection,
  LocalStorageKeys,
  mixSettingService,
  PostRepository,
  SearchFilter,
} from '@mix-lib';
import { MixPostPortal } from '../../../../../../mix.lib.ts/build/main/lib/view-models/portal/mix-post-portal';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public postRepo: PostRepository) {}

  ngOnInit(): void {
    // Init Mix Params
    localStorage.setItem(
      LocalStorageKeys.CONF_APP_URL,
      'https://store.mixcore.org/api/v1'
    );
    localStorage.setItem(LocalStorageKeys.CONF_CURRENT_CULTURE, 'en-us');
    mixSettingService.getAllSettings('en-us');

    // Demo Post Repository
    const params: SearchFilter = {
      keyword: null,
      pageIndex: 0,
      pageSize: 10,
      direction: DisplayDirection.Asc,
    };
    this.postRepo.getListModel(params).then((resp) => {
      console.log(resp);
    });

    this.postRepo.getSingleModel(1).then((resp) => {
      if (resp) {
        const p = resp as MixPostPortal;

        console.log(p);
      }
    });

    // Demo crypto service
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
}
