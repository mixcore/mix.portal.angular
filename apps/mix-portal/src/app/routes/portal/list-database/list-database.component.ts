import { Component } from '@angular/core';
import { MixDatabaseVisualizeComponent, ShareModule } from '@mix-spa/mix.share';

@Component({
  selector: 'mix-list-database',
  templateUrl: './list-database.component.html',
  styleUrls: ['./list-database.component.scss'],
  standalone: true,
  imports: [ShareModule, MixDatabaseVisualizeComponent]
})
export class ListDatabaseComponent {}
