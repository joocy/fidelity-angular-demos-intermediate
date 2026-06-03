import { Component, DoCheck, ChangeDetectionStrategy, signal, computed } from '@angular/core';
// OnPush: only checked when an @Input() changes or an event fires from this component
@Component({
  selector: 'app-screener-onpush',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" style="border-left:4px solid #155724">
      <h2>OnPush CD <span style="font-size:0.8rem;font-weight:400;color:#aaa">— checked only when signals change</span></h2>
      <div style="font-size:0.8rem;color:#aaa">CD checks: <strong style="color:#155724;font-size:1.1rem">{{ checks }}</strong></div>
      <div style="font-size:0.85rem;color:#6b7280;margin-top:0.25rem">Stays at 1 — the ticker doesn't cause checks here</div>
      <!-- computed signal: memoised, only recalculates when filterText changes -->
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
  // ✓ computed: calculated once and memoised until filterText changes
  filterLabel = computed(() => {
    const q = this.filterText();
    return q ? `Filtering: "${q}"` : 'Showing all 100 securities';
  });
}
