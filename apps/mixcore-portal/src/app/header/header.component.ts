import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public srv: PostService) {}

  ngOnInit(): void {
    this.srv.get('').then((resp) => console.log(resp));
  }
}
