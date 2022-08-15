import { Component, Input } from '@angular/core';
import { MixTemplateFolder } from '@mix-spa/mix.lib';

import { ShareModule } from '../../share.module';
import { MixToolbarComponent } from '../mix-toolbar';
import { MixFolderFileComponent } from './folder-files/file.component';

@Component({
  selector: 'mix-theme-file-tree',
  templateUrl: './theme-file-tree.component.html',
  styleUrls: ['./theme-file-tree.component.scss'],
  standalone: true,
  imports: [ShareModule, MixToolbarComponent, MixFolderFileComponent]
})
export class ThemeFileTreeComponent {
  @Input() public themeId: number | undefined = undefined;
  @Input() public showFileDate = true;

  public FOLDER = MixTemplateFolder;
}
