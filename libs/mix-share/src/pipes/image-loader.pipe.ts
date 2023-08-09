import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mixImg', standalone: true })
export class MixImgLoaderPipe implements PipeTransform {
  public transform(src: string | null, size: string) {
    if (!src) return src;

    if (src.indexOf('daphale_studios') < 0) {
      return src;
    }

    const lastDotIndex = src.lastIndexOf('.');
    const fileName = src.slice(0, lastDotIndex);
    const extension = src.slice(lastDotIndex + 1);
    const modifiedImage = `${fileName}-${size.toUpperCase()}.${extension}`;
    return modifiedImage;
  }
}
