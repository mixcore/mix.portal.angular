import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListPostComponent {}
