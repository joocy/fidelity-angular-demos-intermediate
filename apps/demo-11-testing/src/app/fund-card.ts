import { Component, Input, Output, EventEmitter } from '@angular/core';
export interface Fund { id:string; name:string; ytdReturn:number; riskRating:string; }

@Component({
  selector: 'app-fund-card',
  template: `
    <div class="card" style="cursor:pointer" (click)="selected.emit(fund)" data-testid="fund-card">
      <div style="font-weight:700" data-testid="fund-name">{{ fund.name }}</div>
      <div [style.color]="fund.ytdReturn>=0?'#155724':'#721c24'" data-testid="fund-return">
        {{ fund.ytdReturn>=0?'+':'' }}{{ fund.ytdReturn }}% YTD
      </div>
      <div style="font-size:0.8rem;color:#6b7280">Risk: {{ fund.riskRating }}</div>
    </div>
  `,
})
export class FundCard {
  @Input() fund!: Fund;
  @Output() selected = new EventEmitter<Fund>();
}
