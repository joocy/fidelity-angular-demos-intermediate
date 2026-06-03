import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
const FUNDS = [
  { id:'uk-eq',  name:'Apex UK Equity Fund',      ytd: 8.4 },
  { id:'gov-bd', name:'Apex Government Bond Fund', ytd: 2.1 },
  { id:'em',     name:'Apex Emerging Markets Fund',ytd:14.7 },
];
@Component({
  selector: 'app-funds-list',
  imports: [RouterLink],
  template: `
    <h2>Funds <span style="font-size:0.8rem;color:#aaa">(lazy-loaded)</span></h2>
    <div style="display:grid;gap:0.75rem">
      @for (f of funds; track f.id) {
        <div class="card" style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div style="font-weight:600">{{ f.name }}</div>
            <div [style.color]="f.ytd>=0?'#155724':'#721c24'" style="font-size:0.85rem">{{ f.ytd>=0?'+':'' }}{{ f.ytd }}% YTD</div>
          </div>
          <a [routerLink]="['/portal/funds', f.id]" class="btn-secondary" style="text-decoration:none;padding:0.4rem 0.75rem;border-radius:4px">View</a>
        </div>
      }
    </div>
  `,
})
export class FundsList { funds = FUNDS; }
