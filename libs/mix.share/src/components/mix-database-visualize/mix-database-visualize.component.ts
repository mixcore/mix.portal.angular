import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ShareModule } from '../../share.module';
import { MixDatabaseGraphComponent } from '../mix-database-graph/mix-database-graph.component';

@Component({
  selector: 'mix-database-visualize',
  templateUrl: './mix-database-visualize.component.html',
  styleUrls: ['./mix-database-visualize.component.scss'],
  standalone: true,
  imports: [ShareModule, MixDatabaseGraphComponent]
})
export class MixDatabaseVisualizeComponent {
  public toolbarForm = new FormGroup({
    autoSave: new FormControl(true),
    viewMode: new FormControl('graph')
  });

  constructor() {
    //
  }
}
