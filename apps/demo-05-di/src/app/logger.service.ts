import { Injectable } from '@angular/core';

/**
 * Logger interface and two implementations.
 * In tests or specific components, we can swap which one is injected.
 */
export interface Logger { log(msg: string): void; }

@Injectable()
export class ConsoleLogger implements Logger {
  log(msg: string) { console.log('[Console]', msg); }
}

@Injectable()
export class TimestampLogger implements Logger {
  log(msg: string) { console.log(`[${new Date().toISOString()}]`, msg); }
}
