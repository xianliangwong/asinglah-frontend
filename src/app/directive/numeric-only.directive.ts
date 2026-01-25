import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputPriceNumericOnly]',
  standalone: true,
})
export class PriceNumericOnlyDirective {
  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const allowed = /^\d+(\.\d{0,2})?$/;
    if (!allowed.test(value)) {
      // remove last invalid character each time user type
      input.value = value.slice(0, -1);
    }
  }
}
