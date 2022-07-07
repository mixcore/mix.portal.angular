import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss'],
  standalone: true,
  imports: [ShareModule]
})
export class ListTemplateComponent {
  public themeId = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.themeId = this.activatedRoute.snapshot?.params['themeId'];
  }
}
