import { Component } from '@angular/core';
import { MixContentType } from '@mix-spa/mix.lib';
import { MixPolymorphousListComponent, ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  standalone: true,
  imports: [ShareModule, MixPolymorphousListComponent]
})
export class ListPostComponent {
  public type: MixContentType = MixContentType.Post;
}
