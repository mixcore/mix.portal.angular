import { Injectable } from '@angular/core';
import { LRUCache } from 'lru-cache';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public cache: LRUCache<string, any>;

  constructor() {
    this.cache = new LRUCache({
      max: 100,
      maxSize: 5000,
      sizeCalculation: (value, key) => {
        return 1;
      },
      ttl: 1000 * 60 * 5,
    });
  }

  public get(url: string): any {
    return this.cache.get(url);
  }

  public delete(url: string): any {
    return this.cache.delete(url);
  }

  public set(url: string, data: any): void {
    console.log(data);
    this.cache.set(url, data, {});
  }

  public has(url: string): boolean {
    return this.cache.has(url);
  }
}
