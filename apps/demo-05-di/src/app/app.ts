import { Component, inject, signal } from '@angular/core';
import { TradeService } from './trade.service';
import { ConsoleLogger, TimestampLogger } from './logger.service';

@Component({
  selector: 'app-root',
  imports: [],
  // Component-level provider: this component gets its own ConsoleLogger instance,
  // AND we swap it for TimestampLogger — showing useClass override.
  providers: [
    { provide: ConsoleLogger, useClass: TimestampLogger }
  ],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 05: Dependency Injection</span></nav>
    <div style="padding:1.5rem;max-width:700px;margin:0 auto">

      <div class="card">
        <h2>What this demo shows</h2>
        <ul style="font-size:0.9rem;color:#374151;line-height:1.8">
          <li><strong>InjectionToken</strong>: API_URL is a typed string token (not a class)</li>
          <li><strong>inject()</strong>: modern alternative to constructor injection</li>
          <li><strong>useClass</strong>: this component overrides ConsoleLogger with TimestampLogger</li>
          <li><strong>Component scope</strong>: the override only applies to this component subtree</li>
        </ul>
      </div>

      <div class="card">
        <h2>Submit a trade</h2>
        <p style="font-size:0.85rem;color:#6b7280;margin-bottom:0.75rem">
          Open the console — you'll see timestamps instead of plain console logs
          because this component provides TimestampLogger via useClass.
        </p>
        <button class="btn-primary" (click)="submit()">Submit Test Trade (AAPL × 50)</button>
        @if (result()) {
          <div style="margin-top:0.75rem;padding:0.6rem;background:#d4edda;border-radius:4px;font-size:0.85rem">
            Trade ID: {{ result()!.id }} — {{ result()!.status }}
          </div>
        }
      </div>
    </div>
  `,
})
export class App {
  private svc = inject(TradeService);
  result = signal<{id:string;symbol:string;qty:number;status:string}|null>(null);
  submit() { this.result.set(this.svc.submit('AAPL', 50)); }
}
