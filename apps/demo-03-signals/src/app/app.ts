import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { WatchlistService } from './watchlist.service';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 03: Signals</span></nav>
    <div style="padding:1.5rem;max-width:900px;margin:0 auto">

      <!-- computed() value updates automatically when any holding changes -->
      <div class="card" style="display:flex;gap:2rem">
        <div>
          <div style="font-size:0.8rem;color:#6b7280">TOTAL VALUE (computed)</div>
          <div style="font-size:1.75rem;font-weight:700">{{ svc.totalValue() | currency }}</div>
        </div>
        <div>
          <div style="font-size:0.8rem;color:#6b7280">HOLDINGS (computed)</div>
          <div style="font-size:1.75rem;font-weight:700">{{ svc.count() }}</div>
        </div>
      </div>

      <div class="card">
        <h2>Holdings — click price buttons to update via signal</h2>
        <table>
          <thead><tr><th>Symbol</th><th>Name</th><th>Price</th><th>Qty</th><th>Value</th><th></th></tr></thead>
          <tbody>
            @for (h of svc.holdings(); track h.symbol) {
              <tr>
                <td><strong>{{ h.symbol }}</strong></td>
                <td>{{ h.name }}</td>
                <td>
                  <button class="btn-secondary" style="font-size:0.75rem;padding:0.15rem 0.4rem"
                    (click)="svc.updatePrice(h.symbol, -1)">−</button>
                  {{ h.price | currency }}
                  <button class="btn-secondary" style="font-size:0.75rem;padding:0.15rem 0.4rem"
                    (click)="svc.updatePrice(h.symbol, +1)">+</button>
                </td>
                <td>{{ h.quantity }}</td>
                <td>{{ h.price * h.quantity | currency }}</td>
                <td>
                  <button class="btn-secondary" style="font-size:0.75rem;color:#721c24"
                    (click)="svc.remove(h.symbol)">✕</button>
                </td>
              </tr>
            }
          </tbody>
        </table>
        <p style="font-size:0.8rem;color:#6b7280;margin-top:0.5rem">
          Open the console to see the effect() log on every update.
        </p>
      </div>
    </div>
  `,
})
export class App {
  svc = inject(WatchlistService);
}
