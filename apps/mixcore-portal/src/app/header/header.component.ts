import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-service';
import { SearchFilter } from '@mix-lib';

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
    };
    console.log('sadfa', this.srv.modelUrl);
    this.srv
      .getSingleModel(1)
      .then((resp) => console.log(resp.createdDateTime));
  }
}
