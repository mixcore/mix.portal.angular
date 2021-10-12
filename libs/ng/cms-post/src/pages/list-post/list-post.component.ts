import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostRepository } from '@mix-lib';

@Component({
  selector: 'list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPostComponent {}
