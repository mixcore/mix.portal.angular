import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MixEaterEgg {
  //
  private keyword = 'phongcaodev';
  private typedKeyword = '';
  private typingTimeout: any;
  private typingDelay = 2000;

  private hideImage = false;

  constructor() {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      this.onKeyDown(event);
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    this.typedKeyword += key;

    if (this.typedKeyword.includes(this.keyword)) {
      this.hideImage = !this.hideImage;
      if (this.hideImage) {
        document.documentElement.classList.add('hide-image');
      } else {
        document.documentElement.classList.remove('hide-image');
      }
      this.clearTypingTimeout();
      this.typedKeyword = '';
    }

    this.setTypingTimeout();
  }

  private setTypingTimeout(): void {
    this.clearTypingTimeout();
    this.typingTimeout = setTimeout(() => {
      this.typedKeyword = '';
    }, this.typingDelay);
  }

  private clearTypingTimeout(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }
}
