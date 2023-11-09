import { Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LRUCache } from 'lru-cache';
import { Subject, debounceTime } from 'rxjs';

export type StorageCache = { [key: string]: any };

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public cache: LRUCache<string, any>;
  public localStoreDelay$ = new Subject();

  constructor() {
    this.cache = new LRUCache({
      max: 100,
      maxSize: 5000,
      sizeCalculation: (value, key) => {
        return 1;
      },
      ttl: 1000 * 60 * 5,
    });

    this.initFromDiskCache();
    this.localStoreDelay$
      .pipe(debounceTime(300), takeUntilDestroyed())
      .subscribe((v) => {
        this.storeIntoDiskCache();
      });
  }

  public get(url: string): any {
    return this.cache.get(url);
  }

  public delete(url: string): any {
    return this.cache.delete(url);
  }

  public set(url: string, data: any): void {
    this.cache.set(url, data, {});
    this.localStoreDelay$.next({});
  }

  public has(url: string): boolean {
    return this.cache.has(url);
  }

  public storeIntoDiskCache() {
    const storeValue: StorageCache = {};
    Array.from(this.cache.keys()).forEach((key) => {
      storeValue[key] = this.cache.get(key);
    });

    localStorage.setItem('__MIX_CACHE_STORAGE__', JSON.stringify(storeValue));
  }

  public initFromDiskCache() {
    const dataString = localStorage.getItem('__MIX_CACHE_STORAGE__');
    if (dataString) {
      const data = JSON.parse(dataString) as StorageCache;
      Object.keys(data).forEach((key) => {
        this.set(key, data[key]);
      });
    }
  }
}
