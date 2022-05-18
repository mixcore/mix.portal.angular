import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wemeColumnHeader]'
})
export class TableHeaderDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
