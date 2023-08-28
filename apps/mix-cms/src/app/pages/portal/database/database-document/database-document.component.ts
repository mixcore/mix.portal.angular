import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { DatabaseSelectComponent } from '../../../../components/database-select/database-select.component';

@Component({
  selector: 'mix-database-document',
  standalone: true,
  imports: [CommonModule, DatabaseSelectComponent, TuiAccordionModule],
  templateUrl: './database-document.component.html',
  styleUrls: ['./database-document.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatabaseDocumentComponent implements OnInit {
  public activeRoute = inject(ActivatedRoute);
  public location = inject(Location);
  public destroyRef = inject(DestroyRef);
  public id?: string | number;
  public db?: MixDatabase;
  public text = `
    curl --request GET \
    <br />--url 'https://demo.undb.xyz/api/v1/openapi/tables/tblruubokdc/records?viewId=viw2j74tv49' \
    <br />--header 'Authorization: Bearer REPLACE_BEARER_TOKEN'
  `;

  ngOnInit() {
    this.activeRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const state = this.location.getState() as { [key: string]: any };
        if (state && state['db']) {
          this.db = state['db'];
          return;
        }

        this.id = params['id'];
        if (!this.id) {
          return;
        }
        //
      });
  }
}
