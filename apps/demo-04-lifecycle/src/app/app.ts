import { Component, signal } from '@angular/core';
import { FundDetail } from './fund-detail';

const FUNDS = ['APX-EQ-UK', 'APX-GOV-BOND', 'APX-EM'];

@Component({
  selector: 'app-root',
  imports: [FundDetail],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 04: Lifecycle</span></nav>
    <div style="padding:1.5rem;max-width:800px;margin:0 auto">
      <h1 style="margin-bottom:0.25rem">Component Lifecycle Hooks</h1>
      <p style="color:#6b7280;margin-bottom:1rem">
        Select a different fund to trigger ngOnChanges. Use "Remove" to trigger ngOnDestroy.
        All hook calls are logged to the browser console.
      </p>
      <div class="card" style="margin-bottom:1rem">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
          @for (f of funds; track f) {
            <button [class]="selected()===f?'btn-primary':'btn-secondary'" (click)="selected.set(f)">{{ f }}</button>
          }
          <button class="btn-secondary" style="color:#721c24" (click)="selected.set('')">Remove component</button>
        </div>
      </div>
      @if (selected()) {
        <app-fund-detail [fundId]="selected()" />
      }
    </div>
  `,
})
export class App {
  funds = FUNDS;
  selected = signal(FUNDS[0]);
}
