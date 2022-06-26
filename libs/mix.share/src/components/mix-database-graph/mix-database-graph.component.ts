import { CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MixDatabaseModel } from '@mix-spa/mix.lib';
import panzoom, { PanZoom, Transform } from 'panzoom';

import { DatabaseApiService } from '../../services';
import { ShareModule } from '../../share.module';
import { MixDatabaseCardComponent } from '../mix-database-card/mix-database-card.component';

@Component({
  selector: 'mix-database-graph',
  templateUrl: './mix-database-graph.component.html',
  styleUrls: ['./mix-database-graph.component.scss'],
  standalone: true,
  imports: [ShareModule, DragDropModule, MixDatabaseCardComponent]
})
export class MixDatabaseGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvasElement!: ElementRef;
  @ViewChildren(MixDatabaseCardComponent)
  databaseCard!: QueryList<MixDatabaseCardComponent>;

  public zoomScale = 1;
  public graphViewCanvas!: PanZoom;
  public dragPosition = { x: 20, y: 20 };
  public databases: MixDatabaseModel[] = [];

  constructor(
    private databaseApi: DatabaseApiService,
    private cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.databaseApi.getDatabase({}).subscribe(result => {
      this.databases = result.items;
      this.cdr.detectChanges();
    });
  }

  public ngAfterViewInit() {
    this.graphViewCanvas = panzoom(this.canvasElement.nativeElement, {
      maxZoom: 1,
      minZoom: 0.1,
      smoothScroll: true
    });

    this.graphViewCanvas.on('transform', e => {
      const result: Transform = this.graphViewCanvas.getTransform();
      this.zoomScale = result.scale;
    });

    this.graphViewCanvas.smoothZoom(0, 0, 0.4);
  }

  public pauseZoom() {
    this.graphViewCanvas.pause();
  }

  public resumeZoom() {
    this.graphViewCanvas.resume();
  }

  public onDragMove(value: CdkDragMove): void {
    console.log(value);
  }
}
