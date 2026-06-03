import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PortfolioService } from './portfolio.service';

/** Sibling A: reads from the shared signal service */
@Component({
  selector: 'app-portfolio-stats',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" style="border-left:4px solid #1a3a6b">
      <h2>Portfolio Stats (reads shared signals)</h2>
      <div style="display:flex;gap:2rem">
        <div><div style="font-size:0.8rem;color:#6b7280">Positions</div><strong style="font-size:1.5rem">{{ svc.count() }}</strong></div>
        <div><div style="font-size:0.8rem;color:#6b7280">Total Value</div><strong style="font-size:1.5rem">{{ svc.totalValue() | currency }}</strong></div>
      </div>
    </div>
  `,
})
export class PortfolioStats { svc = inject(PortfolioService); }
