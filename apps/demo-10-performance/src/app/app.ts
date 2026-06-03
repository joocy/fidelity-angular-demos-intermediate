import { Component } from '@angular/core';
import { Ticker }          from './ticker';
import { ScreenerDefault } from './screener-default';
import { ScreenerOnPush }  from './screener-onpush';

@Component({
  selector: 'app-root',
  imports: [Ticker, ScreenerDefault, ScreenerOnPush],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 10: Performance</span></nav>
    <div style="padding:1.5rem;max-width:900px;margin:0 auto">
      <div class="card" style="margin-bottom:1rem">
        <h2>Live Price Ticker <span style="font-size:0.8rem;color:#aaa">(updates every 800ms via setInterval — inside Angular zone)</span></h2>
        <app-ticker />
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <app-screener-default />
        <app-screener-onpush />
      </div>
      <p style="font-size:0.85rem;color:#6b7280;margin-top:0.75rem">
        Watch the CD check counters. Default climbs every 800ms.
        OnPush stays at 1 because it has no @Input() changes and no internal events.
      </p>
    </div>
  `,
})
export class App {}
