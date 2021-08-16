import { AfterViewInit, Directive, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { Subject } from 'rxjs';

export enum ComponentType {
  Dump = 'Dump',
  Smart = 'Smart'
}

@Directive()
export abstract class BaseComponent<T = ComponentType> implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  public onDestroy$: Subject<unknown> = new Subject<unknown>();
  public isInitiated: boolean = false;
  public isViewInitiated: boolean = false;
  public type: T | undefined;
  protected isDestroyed: boolean = false;

  /**
   * This function is for internal use only, please don't override it
   * @internal FW
   */
  public ngOnInit(): void {
    this.internalInit();
    this.onInit();
    this.isInitiated = true;
  }

  /**
   * This function is for internal use only, please don't override it
   * @internal FW
   */
  public ngAfterViewInit(): void {
    this.internalAfterViewInit();
    this.onAfterViewInit();
    this.isViewInitiated = true;
  }

  /**
   * This function is for internal use only, please don't override it
   * @internal FW
   */
  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
    this.onDestroy();
    this.isInitiated = false;
    this.isDestroyed = true;
  }

  /**
   * This function is for internal use only, please don't override it
   * @internal FW
   */
  public ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }

  /**
   * This function is for internal use only, please don't override it
   * @internal FW
   */
  protected internalInit(): void {
    // Virtual method
  }

  /**
   * This function is for internal use only, please don't override it
   * @internal FW
   */
  protected internalAfterViewInit(): void {
    // Virtual method
  }

  /**
   * This function is for internal use only, please don't override it
   * @internal FW
   */
  protected internalDestroy(): void {
    // Virtual method
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onChanges(changes: SimpleChanges): void {
    // Virtual method
  }

  protected onInit(): void {
    // Virtual method
  }

  protected onAfterViewInit(): void {
    // Virtual method
  }

  protected onDestroy(): void {
    // Virtual method
  }
}
