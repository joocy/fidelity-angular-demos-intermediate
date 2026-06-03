import { Injectable, signal, computed, effect } from '@angular/core';

export interface Holding { symbol: string; name: string; price: number; quantity: number; }

const INITIAL: Holding[] = [
  { symbol:'AAPL', name:'Apple Inc.',     price:182.50, quantity:100 },
  { symbol:'MSFT', name:'Microsoft Corp.',price:415.20, quantity: 80 },
  { symbol:'JPM',  name:'JPMorgan Chase', price:198.75, quantity:150 },
];

/**
 * Signal-based state service.
 * Pattern: private writable signal → expose as readonly → computed for derived values.
 * Only this service can mutate the state; components just read.
 */
@Injectable({ providedIn: 'root' })
export class WatchlistService {
  // ① Private writable signal — only this service can call .set() or .update()
  private _holdings = signal<Holding[]>([...INITIAL]);

  // ② Public readonly view — components can read but not write
  readonly holdings = this._holdings.asReadonly();

  // ③ computed(): derived value — memoised, recalculates only when _holdings changes
  readonly totalValue = computed(() =>
    this._holdings().reduce((sum, h) => sum + h.price * h.quantity, 0)
  );

  readonly count = computed(() => this._holdings().length);

  constructor() {
    // ④ effect(): side effect — runs when holdings changes
    effect(() => {
      console.log('Watchlist updated:', this._holdings().map(h => h.symbol).join(', '));
    });
  }

  updatePrice(symbol: string, delta: number) {
    this._holdings.update(list =>
      list.map(h => h.symbol === symbol
        ? { ...h, price: +(h.price + delta).toFixed(2) }
        : h
      )
    );
  }

  remove(symbol: string) {
    this._holdings.update(list => list.filter(h => h.symbol !== symbol));
  }
}
