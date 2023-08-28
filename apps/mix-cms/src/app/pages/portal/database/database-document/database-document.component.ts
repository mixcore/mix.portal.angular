import { CommonModule, Location } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MixDatabase } from '@mixcore/lib/model';
import { DatabaseSelectComponent } from '../../../../components/database-select/database-select.component';

@Component({
  selector: 'mix-database-document',
  standalone: true,
  imports: [CommonModule, DatabaseSelectComponent],
  templateUrl: './database-document.component.html',
  styleUrls: ['./database-document.component.scss'],
})
export class DatabaseDocumentComponent implements OnInit {
  public activeRoute = inject(ActivatedRoute);
  public location = inject(Location);
  public destroyRef = inject(DestroyRef);
  public id?: string | number;
  public db?: MixDatabase;

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
