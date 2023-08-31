import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  Pipe,
  PipeTransform,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { DatabaseSelectComponent } from '../../../../components/database-select/database-select.component';
import { mixDbDocumentJsonGenerator } from './database-document.generator';

export interface DbDocument {
  [key: string]: {
    method: string;
    path: string;
    title: string;
  };
}

@Pipe({ name: 'filterDocumentMenu', pure: true, standalone: true })
export class DatabaseDocumentPipe implements PipeTransform {
  transform(keys: string[], args: DbDocument | undefined) {
    if (!args) return [];

    return keys
      .filter((key) => args[key])
      .map((key) => ({
        id: key,
        method: args[key].method,
        title: args[key].title,
      }));
  }
}

@Component({
  selector: 'mix-database-document',
  standalone: true,
  imports: [
    CommonModule,
    DatabaseSelectComponent,
    TuiAccordionModule,
    DatabaseDocumentPipe,
  ],
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

  public dbDocument?: DbDocument;
  public dbDocumentKey: string[] = [];

  ngOnInit() {
    this.activeRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const state = this.location.getState() as { [key: string]: any };
        if (state?.['db']) {
          this.db = state['db'];
          this.initDb(state['db']);

          return;
        }

        this.id = params['id'];
        if (!this.id) {
          return;
        }
      });
  }

  public initDb(mixDb: MixDatabase) {
    this.dbDocument = mixDbDocumentJsonGenerator(mixDb.displayName);
    this.dbDocumentKey = Object.keys(this.dbDocument);
  }
}
