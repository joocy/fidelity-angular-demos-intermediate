import { Injectable, signal, computed, effect } from '@angular/core';

export interface Position { symbol: string; name: string; qty: number; price: number; }

/**
 * Signal-based state service — the recommended pattern for shared state.
 *
 * ✓ Private writable signal (only this service mutates)
 * ✓ Public readonly signals (components read but can't write)
 * ✓ computed() for derived values — memoised, not recalculated on every CD cycle
 * ✓ effect() for side effects — runs automatically when state changes
 */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private _positions = signal<Position[]>([
    { symbol:'AAPL', name:'Apple Inc.',     qty:100, price:182.50 },
    { symbol:'MSFT', name:'Microsoft Corp.',qty: 80, price:415.20 },
  ]);

  // Readonly signals exposed to components
  readonly positions  = this._positions.asReadonly();
  readonly count      = computed(() => this._positions().length);
  readonly totalValue = computed(() =>
    this._positions().reduce((s, p) => s + p.qty * p.price, 0)
  );

  constructor() {
    effect(() => {
      // This runs whenever positions changes — persists to localStorage
      sessionStorage.setItem('portfolio', JSON.stringify(this._positions()));
    });
  }

  add(p: Position)          { this._positions.update(list => [...list, p]); }
  remove(symbol: string)    { this._positions.update(list => list.filter(p => p.symbol !== symbol)); }
}
