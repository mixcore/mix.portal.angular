import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public title: string = 'mix-portal';
}
