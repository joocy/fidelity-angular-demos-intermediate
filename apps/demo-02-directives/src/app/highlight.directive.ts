import { Directive, Input, HostListener, HostBinding } from '@angular/core';

/**
 * ATTRIBUTE DIRECTIVE: modifies the appearance of its host element.
 * @HostBinding binds a property on the host element to a class field.
 * @HostListener subscribes to DOM events on the host element.
 * The highlight colour is configurable via @Input — same attribute does both jobs.
 *
 * Usage: <tr [appHighlight]="'#f0f4ff'">
 */
@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @Input() appHighlight = '#f0f4ff';            // colour is configurable
  @HostBinding('style.backgroundColor') bg = ''; // bound to host element style

  @HostListener('mouseenter') onEnter() { this.bg = this.appHighlight; }
  @HostListener('mouseleave') onLeave() { this.bg = ''; }
}
