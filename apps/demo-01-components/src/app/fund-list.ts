import { Component, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Fund, FUNDS } from './fund.model';
import { FundCard } from './fund-card';

/**
 * SMART component: owns the data and state.
 * Handles selection and passes data DOWN to presentational FundCard children.
 * Uses ng-content slot in FundCard to project a "View details" button per card.
 */
@Component({
  selector: 'app-fund-list',
  imports: [FundCard, CurrencyPipe],
  template: `
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1.5rem">
      @for (fund of funds; track fund.id) {
        <app-fund-card [fund]="fund" (selected)="onSelect($event)">
          <!-- Projected content: injected into the card's <ng-content> slot -->
          <button class="btn-secondary" style="width:100%;font-size:0.8rem"
            (click)="$event.stopPropagation(); onSelect(fund)">
            View details →
          </button>
        </app-fund-card>
      }
    </div>

    @if (selectedFund()) {
      <div class="card" style="border-left:4px solid #e05010">
        <h2>Selected Fund</h2>
        <div style="font-size:1.1rem;font-weight:600">{{ selectedFund()!.name }}</div>
        <div style="color:#6b7280;font-size:0.9rem;margin-top:0.25rem">{{ selectedFund()!.isin }}</div>
      </div>
    }
  `,
})
export class FundList {
  funds = FUNDS;
  selectedFund = signal<Fund | null>(null);

  onSelect(fund: Fund) { this.selectedFund.set(fund); }
}
