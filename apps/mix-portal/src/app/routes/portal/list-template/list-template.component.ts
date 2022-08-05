import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MixTemplateFolder } from '@mix-spa/mix.lib';
import { MixToolbarComponent, ShareModule } from '@mix-spa/mix.share';

import { MixFolderFileComponent } from './folder-files/file.component';

@Component({
  selector: 'mix-list-template',
  templateUrl: './list-template.component.html',
  styleUrls: ['./list-template.component.scss'],
  standalone: true,
  imports: [ShareModule, MixToolbarComponent, MixFolderFileComponent]
})
export class ListTemplateComponent {
  public themeId = 1;
  public FOLDER = MixTemplateFolder;

  constructor(private activatedRoute: ActivatedRoute) {
    this.themeId = this.activatedRoute.snapshot?.params['themeId'];
  }
}
