import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { PortfolioService } from './portfolio.service';

/** Sibling B: reads AND writes to the shared signal service */
@Component({
  selector: 'app-positions-list',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Positions (reads + writes shared signals)</h2>
      <table>
        <thead><tr><th>Symbol</th><th>Name</th><th>Qty</th><th>Price</th><th>Value</th><th></th></tr></thead>
        <tbody>
          @for (p of svc.positions(); track p.symbol) {
            <tr>
              <td><strong>{{ p.symbol }}</strong></td>
              <td>{{ p.name }}</td>
              <td>{{ p.qty }}</td>
              <td>{{ p.price | currency }}</td>
              <td>{{ p.qty * p.price | currency }}</td>
              <td><button class="btn-secondary" style="font-size:0.75rem;color:#721c24" (click)="svc.remove(p.symbol)">✕</button></td>
            </tr>
          }
        </tbody>
      </table>
      <button class="btn-primary" style="margin-top:0.75rem" (click)="addJPM()">Add JPMorgan</button>
    </div>
  `,
})
export class PositionsList {
  svc = inject(PortfolioService);
  addJPM() { this.svc.add({ symbol:'JPM', name:'JPMorgan Chase', qty:150, price:198.75 }); }
}
