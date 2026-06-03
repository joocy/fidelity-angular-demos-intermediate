import { Component, signal } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { HasRoleDirective }   from './has-role.directive';

const TRADES = [
  { id:'T001', symbol:'AAPL', side:'buy',  qty:100, price:182.50 },
  { id:'T002', symbol:'GS',   side:'sell', qty: 50, price:455.00 },
  { id:'T003', symbol:'MSFT', side:'buy',  qty: 80, price:414.00 },
];

@Component({
  selector: 'app-root',
  imports: [HighlightDirective, HasRoleDirective],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 02: Directives</span></nav>
    <div style="padding:1.5rem;max-width:900px;margin:0 auto">

      <div class="card">
        <h2>Current role</h2>
        <div style="display:flex;gap:0.5rem">
          @for (r of roles; track r) {
            <button [class]="role()===r?'btn-primary':'btn-secondary'" (click)="role.set(r)">{{ r }}</button>
          }
        </div>
      </div>

      <!-- HasRoleDirective: structural — shown only to trader/admin -->
      <div *appHasRole="role()" class="card" style="border-left:4px solid #e05010">
        <h2>Trade Blotter <span style="font-size:0.8rem;font-weight:400">(traders and admins only)</span></h2>
        <table>
          <thead><tr><th>ID</th><th>Symbol</th><th>Side</th><th>Qty</th><th>Price</th></tr></thead>
          <tbody>
            @for (t of trades; track t.id) {
              <!-- HighlightDirective: attribute — highlights row on hover -->
              <tr [appHighlight]="t.side==='buy'?'#f0fff4':'#fff5f5'">
                <td style="color:#aaa;font-size:0.8rem">{{ t.id }}</td>
                <td><strong>{{ t.symbol }}</strong></td>
                <td [style.color]="t.side==='buy'?'#155724':'#721c24'">{{ t.side | uppercase }}</td>
                <td>{{ t.qty }}</td>
                <td>{{ t.price }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (!['trader','admin'].includes(role())) {
        <div class="card" style="color:#6b7280">
          The trade blotter is hidden for the <strong>{{ role() }}</strong> role.
          Switch to <em>trader</em> or <em>admin</em> to reveal it.
        </div>
      }
    </div>
  `,
})
export class App {
  roles = ['viewer', 'trader', 'admin'];
  role  = signal('trader');
  trades = TRADES;
}
