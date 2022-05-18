import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wemeColumnCell]'
})
export class TableCellDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
