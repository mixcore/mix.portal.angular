import { Component, OnInit } from '@angular/core';
import { PostService, SearchFilter } from '@mix-lib';
import { DisplayDirection } from 'libs/mix-lib/lib/enums/display-direction.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public srv: PostService) {}

  ngOnInit(): void {
    let params: SearchFilter = {
      keyword: null,
      pageIndex: 0,
      pageSize: 10,
      direction: DisplayDirection.Asc,
    };
    this.srv.setAppUrl('https://store.mixcore.org');
    this.srv.setLanguage('en-us');
    this.srv
      .getListModel(params)
      .then((resp) => console.log(resp.createdDateTime));
  }
}
