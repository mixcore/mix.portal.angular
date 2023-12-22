import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'default-skeleton',
  host: {
    class: 'w-full block',
  },
  template: `
    <div role="status" class="max-w-sm animate-pulse">
      <div
        class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
      ></div>
      <div
        class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"
      ></div>
      <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div
        class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"
      ></div>
      <div
        class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"
      ></div>
      <div
        class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"
      ></div>
      <span class="sr-only">Loading...</span>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixDefaultSkeletonComponent {}
