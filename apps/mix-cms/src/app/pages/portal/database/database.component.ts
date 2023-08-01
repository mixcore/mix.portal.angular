import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { RelativeTimeSpanPipe } from '@mixcore/share/pipe';
import { MixButtonComponent } from '@mixcore/ui/button';
import { MixDataTableModule } from '@mixcore/ui/table';
import { Apollo, gql } from 'apollo-angular';
import { CMS_ROUTES } from '../../../app.routes';
import { MixStatusIndicatorComponent } from '../../../components/status-indicator/mix-status-indicator.component';
import { MixSubToolbarComponent } from '../../../components/sub-toolbar/sub-toolbar.component';
import { DatabaseStore } from '../../../stores/database.store';

@Component({
  selector: 'mix-database',
  standalone: true,
  imports: [
    CommonModule,
    MixSubToolbarComponent,
    MixButtonComponent,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    RelativeTimeSpanPipe,
  ],
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent {
  apollo = inject(Apollo);
  store = inject(DatabaseStore);
  router = inject(Router);
  selectedPages: MixDatabase[] = [];

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            shippingmethod_list {
              id
              status
              totalCount
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });
  }

  async goDetail(id: number) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal.database.fullPath}/${id}`
    );
  }

  async goDatabaseData(sysName: string) {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal['database-data'].fullPath}/${sysName}`
    );
  }

  async createDatabase() {
    await this.router.navigateByUrl(
      `${CMS_ROUTES.portal.database.fullPath}/create`
    );
  }
}
