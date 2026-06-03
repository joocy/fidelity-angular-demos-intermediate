import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Fund } from './fund.model';

/**
 * PRESENTATIONAL component: receives data via @Input(), emits events via @Output().
 * Has no knowledge of where the data comes from or what happens after a click.
 * Uses ng-content so the parent can inject a custom footer into the card.
 */
@Component({
  selector: 'app-fund-card',
  template: `
    <div class="card" style="border-left:4px solid #1a3a6b;cursor:pointer"
         (click)="selected.emit(fund)">
      <div style="font-weight:700;margin-bottom:0.2rem">{{ fund.name }}</div>
      <div style="font-size:0.8rem;color:#aaa;margin-bottom:0.5rem">{{ fund.isin }}</div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span [class]="fund.ytdReturn>=0?'badge badge-up':'badge badge-down'">
          {{ fund.ytdReturn>=0?'+':'' }}{{ fund.ytdReturn }}% YTD
        </span>
        <span class="badge badge-neutral">{{ fund.riskRating }}</span>
      </div>

      <!-- ng-content: parent can project any HTML into the card footer -->
      <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid #f0f2f5">
        <ng-content />
      </div>
    </div>
  `,
})
export class FundCard {
  @Input() fund!: Fund;
  @Output() selected = new EventEmitter<Fund>();
}
