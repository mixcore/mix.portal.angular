import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public posts: PaginationModel<MixPostPortalModel> = new PaginationModel<MixPostPortalModel>();
  public params: SearchFilter = {
    keyword: undefined,
    pageIndex: 0,
    pageSize: 10,
    direction: DisplayDirection.Asc
  };
  constructor(public postRepo: PostRepository, private crd: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.initParams();
    this.postRepo.getListModel(this.params).then(resp => {
      console.log(resp.items);
      this.posts = resp;
      this.crd.detectChanges();
    });
  }

  initParams() {
    this.postRepo.setBaseURL('https://localhost:5010/api/v2/rest/mix-portal');
    this.postRepo.setLanguage('en-us');
  }
}
