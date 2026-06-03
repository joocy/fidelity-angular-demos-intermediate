import { Component } from '@angular/core';
import { PortfolioStats } from './portfolio-stats';
import { PositionsList }  from './positions-list';

@Component({
  selector: 'app-root',
  imports: [PortfolioStats, PositionsList],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 07: State Management</span></nav>
    <div style="padding:1.5rem;max-width:900px;margin:0 auto">
      <p style="color:#6b7280;margin-bottom:1rem">
        Both components read from the same <code>PortfolioService</code> signal.
        Adding or removing a position in either component instantly updates the stats.
      </p>
      <app-portfolio-stats />
      <app-positions-list />
    </div>
  `,
})
export class App {}
