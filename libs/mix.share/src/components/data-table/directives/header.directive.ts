import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mixColumnHeader]'
})
export class TableHeaderDirective {
  constructor(public template: TemplateRef<unknown>) {}
}
