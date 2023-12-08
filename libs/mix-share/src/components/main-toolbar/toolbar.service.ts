import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToolbarService {
  constructor() {}

  public templatePortal$ = new BehaviorSubject<TemplatePortal | undefined>(
    undefined
  );

  public add(template: TemplateRef<unknown>, viewRef: ViewContainerRef) {
    this.templatePortal$.next(new TemplatePortal(template, viewRef));
  }

  public remove() {
    this.templatePortal$.next(undefined);
  }
}
