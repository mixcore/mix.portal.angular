import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mixColumnCell]'
})
export class TableCellDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
