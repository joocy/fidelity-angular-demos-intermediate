import { Component, DoCheck } from '@angular/core';
// Default CD: checked on EVERY zone event, even when nothing changed here
@Component({
  selector: 'app-screener-default',
  template: `
    <div class="card" style="border-left:4px solid #721c24">
      <h2>Default CD <span style="font-size:0.8rem;font-weight:400;color:#aaa">— checked on every zone event</span></h2>
      <div style="font-size:0.8rem;color:#aaa">CD checks: <strong style="color:#721c24;font-size:1.1rem">{{ checks }}</strong></div>
      <div style="font-size:0.85rem;color:#6b7280;margin-top:0.25rem">This count climbs every 800ms — driven by the ticker's setInterval</div>
      <!-- Method call in template: runs on EVERY CD cycle -->
      <div style="margin-top:0.5rem;font-size:0.85rem">
        Filter label (method): <strong>{{ filterLabel() }}</strong>
      </div>
    </div>
  `,
})
export class ScreenerDefault implements DoCheck {
  checks = 0;
  ngDoCheck() { this.checks++; }
  // ⚠️ Called every CD cycle — in a 100-row table this would run 100× per tick
  filterLabel(): string { return 'Showing all 100 securities'; }
}
