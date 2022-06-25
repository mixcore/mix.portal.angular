import {
  CdkDrag,
  CdkDragEnd,
  DragDropModule,
  DragRef,
  Point
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MixDatabaseModel } from '@mix-spa/mix.lib';

import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-database-card',
  templateUrl: './mix-database-card.component.html',
  styleUrls: ['./mix-database-card.component.scss'],
  standalone: true,
  imports: [ShareModule, DragDropModule]
})
export class MixDatabaseCardComponent {
  @Input() public database?: MixDatabaseModel;
  @Input() public zoomScale = 1;
  @Input() public pos = { x: 0, y: 0 };

  @Output() public dragStart = new EventEmitter<void>();
  @Output() public dragEnd = new EventEmitter<void>();

  dragConstrainPoint = (point: Point, dragRef: DragRef) => {
    let zoomMoveXDifference = 0;
    let zoomMoveYDifference = 0;

    if (this.zoomScale != 1) {
      zoomMoveXDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().x;
      zoomMoveYDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().y;
    }

    return {
      x: point.x + zoomMoveXDifference,
      y: point.y + zoomMoveYDifference
    };
  };

  startDragging() {
    this.dragStart.emit();
  }

  endDragging($event: CdkDragEnd) {
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
  }
}
