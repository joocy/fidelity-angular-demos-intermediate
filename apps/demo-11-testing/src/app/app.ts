import { Component } from '@angular/core';
import { FundCard, Fund } from './fund-card';

const FUNDS: Fund[] = [
  { id:'1', name:'Apex UK Equity Fund',       ytdReturn: 8.4, riskRating:'Medium' },
  { id:'2', name:'Apex Government Bond Fund', ytdReturn: 2.1, riskRating:'Low'    },
  { id:'3', name:'Apex Emerging Markets Fund',ytdReturn:-1.2, riskRating:'High'   },
];

@Component({
  selector: 'app-root',
  imports: [FundCard],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 11: Testing</span></nav>
    <div style="padding:1.5rem;max-width:900px;margin:0 auto">
      <p style="color:#6b7280;margin-bottom:1rem">
        Run tests with: <code>npx nx test demo-11-testing</code>
      </p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
        @for (f of funds; track f.id) {
          <app-fund-card [fund]="f" (selected)="selected=f" />
        }
      </div>
      @if (selected) {
        <div class="card" style="margin-top:1rem;border-left:4px solid #1a3a6b">
          Selected: <strong>{{ selected.name }}</strong>
        </div>
      }
    </div>
  `,
})
export class App {
  funds = FUNDS;
  selected: Fund | null = null;
}
