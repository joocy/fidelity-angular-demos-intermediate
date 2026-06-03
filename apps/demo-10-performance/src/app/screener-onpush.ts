import { Component, DoCheck, ChangeDetectionStrategy, signal, computed } from '@angular/core';
// OnPush: the VIEW is only re-rendered when a signal changes or an event fires here.
// ngDoCheck still runs on every CD cycle — OnPush only skips the template update.
@Component({
  selector: 'app-screener-onpush',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" style="border-left:4px solid #155724">
      <h2>OnPush CD <span style="font-size:0.8rem;font-weight:400;color:#aaa">— view skipped, ngDoCheck still runs</span></h2>
      <div style="font-size:0.8rem;color:#aaa">ngDoCheck calls: <strong style="color:#155724;font-size:1.1rem">{{ checks }}</strong></div>
      <div style="font-size:0.85rem;color:#721c24;margin-top:0.25rem">
        ⚠️ This count is stale — ngDoCheck has been called many more times than displayed.
        Click the button to force a render and reveal the true total.
      </div>
      <button style="margin-top:0.5rem;font-size:0.85rem" (click)="filter()">Force render (reveal true count)</button>
      <div style="margin-top:0.5rem;font-size:0.85rem">
        Filter label (computed): <strong>{{ filterLabel() }}</strong>
      </div>
    </div>
  `,
})
export class ScreenerOnPush implements DoCheck {
  checks = 0;
  ngDoCheck() { this.checks++; }
  filterText  = signal('');
  filterLabel = computed(() => {
    const q = this.filterText();
    return q ? `Filtering: "${q}"` : 'Showing all 100 securities';
  });
  filter() { this.filterText.set('Example filter'); }
}
