import {
  CdkDrag,
  CdkDragEnd,
  DragDropModule,
  DragRef,
  Point
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MixDatabaseModel } from '@mix-spa/mix.lib';

import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-database-card',
  templateUrl: './mix-database-card.component.html',
  styleUrls: ['./mix-database-card.component.scss'],
  standalone: true,
  imports: [ShareModule, DragDropModule]
})
export class MixDatabaseCardComponent implements OnInit {
  @Input() public database!: MixDatabaseModel;
  @Input() public zoomScale = 1;
  @Input() public pos = { x: 20, y: 20 };
  @Input() public initializePos = { x: 0, y: 0 };
  @Input() public index = 0;

  @Output() public dragStart = new EventEmitter<void>();
  @Output() public dragEnd = new EventEmitter<void>();

  public ngOnInit(): void {
    this.pos = { x: (this.index + 1) * 10, y: 20 };
  }

  public dragConstrainPoint = (point: Point, dragRef: DragRef) => {
    let zoomMoveXDifference = 0;
    let zoomMoveYDifference = 0;

    if (this.zoomScale != 1) {
      zoomMoveXDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().x;
      zoomMoveYDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().y;
    }

    return {
      x: point.x + 20 + zoomMoveXDifference,
      y: point.y + zoomMoveYDifference
    };
  };

  public startDragging() {
    this.dragStart.emit();
  }

  public endDragging($event: CdkDragEnd) {
    const elementMoving = $event.source.getRootElement();
    const elementMovingRect: ClientRect = elementMoving.getBoundingClientRect();
    if (elementMoving.parentElement) {
      const elementMovingParentElementRect: ClientRect =
        elementMoving.parentElement.getBoundingClientRect();

      this.pos.x =
        (elementMovingRect.left - elementMovingParentElementRect.left) /
        this.zoomScale;
      this.pos.y =
        (elementMovingRect.top - elementMovingParentElementRect.top) /
        this.zoomScale;

      const cdkDrag = $event.source as CdkDrag;
      cdkDrag.reset();

      this.dragEnd.emit();
    }

    console.log(this.pos);
  }
}
