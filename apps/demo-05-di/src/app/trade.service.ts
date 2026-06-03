import { Injectable, inject } from '@angular/core';
import { API_URL } from './api-url.token';
import { ConsoleLogger } from './logger.service';

@Injectable()
export class TradeService {
  // inject() API — modern alternative to constructor injection
  private logger = inject(ConsoleLogger);
  private apiUrl = inject(API_URL);

  constructor() {
    this.logger.log(`TradeService ready. API: ${this.apiUrl}`);
  }

  submit(symbol: string, qty: number) {
    this.logger.log(`Submitting: ${qty}x ${symbol} via ${this.apiUrl}/trades`);
    return { id: crypto.randomUUID(), symbol, qty, status: 'pending' };
  }
}
