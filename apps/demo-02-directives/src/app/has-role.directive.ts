import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';

/**
 * STRUCTURAL DIRECTIVE: adds or removes elements from the DOM.
 * Uses TemplateRef (the blueprint) and ViewContainerRef (where to render).
 * The * prefix is syntactic sugar for wrapping content in <ng-template>.
 *
 * Usage: <div *appHasRole="'trader'">Trader-only content</div>
 */
@Directive({ selector: '[appHasRole]', standalone: true })
export class HasRoleDirective {
  private tmpl = inject(TemplateRef);
  private vcr  = inject(ViewContainerRef);

  @Input() set appHasRole(role: string) {
    this.vcr.clear();
    if (['trader', 'admin'].includes(role)) {
      this.vcr.createEmbeddedView(this.tmpl); // render the template
    }
    // if role not allowed: vcr stays empty — element is removed from DOM
  }
}
