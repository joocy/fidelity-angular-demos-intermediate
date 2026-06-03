import { Component, input, computed } from '@angular/core';
const FUNDS: Record<string, {name:string;isin:string;ytd:number}> = {
  'uk-eq':  { name:'Apex UK Equity Fund',      isin:'GB00B1234567', ytd: 8.4 },
  'gov-bd': { name:'Apex Government Bond Fund', isin:'GB00B2345678', ytd: 2.1 },
  'em':     { name:'Apex Emerging Markets Fund',isin:'GB00B3456789', ytd:14.7 },
};
/** withComponentInputBinding() maps :id route param to this input() signal — no ActivatedRoute needed */
@Component({
  selector: 'app-fund-detail',
  template: `
    @if (fund()) {
      <h2>{{ fund()!.name }}</h2>
      <div class="card">
        <div style="margin-bottom:0.5rem"><strong>ISIN:</strong> {{ fund()!.isin }}</div>
        <div [style.color]="fund()!.ytd>=0?'#155724':'#721c24'"><strong>YTD:</strong> {{ fund()!.ytd>=0?'+':'' }}{{ fund()!.ytd }}%</div>
      </div>
    }
  `,
})
export class FundDetail {
  id   = input.required<string>();            // bound from :id param via withComponentInputBinding
  fund = computed(() => FUNDS[this.id()]);    // derived from the input signal
}
