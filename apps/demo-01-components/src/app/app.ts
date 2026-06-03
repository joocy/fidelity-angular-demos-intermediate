import { Component } from '@angular/core';
import { FundList } from './fund-list';

@Component({
  selector: 'app-root',
  imports: [FundList],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 01: Components</span></nav>
    <div style="padding:1.5rem;max-width:1000px;margin:0 auto">
      <h1 style="margin-bottom:0.25rem">Smart / Presentational Components</h1>
      <p style="color:#6b7280;margin-bottom:1.5rem">
        <code>FundList</code> is the <strong>smart</strong> component — it owns data and state.
        <code>FundCard</code> is <strong>presentational</strong> — it only displays what it receives.
        The card footer is injected via <code>ng-content</code>.
      </p>
      <app-fund-list />
    </div>
  `,
})
export class App {}
