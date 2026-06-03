import { Component, OnInit, OnDestroy } from '@angular/core';
// Runs inside the Angular zone — triggers CD on the whole tree every 800ms
@Component({
  selector: 'app-ticker',
  template: `<div style="font-size:1.25rem;font-weight:700;color:#e05010">{{ price.toFixed(2) }} <span style="font-size:0.8rem;color:#6b7280">AAPL</span></div>`,
})
export class Ticker implements OnInit, OnDestroy {
  price = 182.50;
  private timer: ReturnType<typeof setInterval> | null = null;
  ngOnInit()  { this.timer = setInterval(() => { this.price = +(this.price * (1 + (Math.random()-.5)*.002)).toFixed(2); }, 800); }
  ngOnDestroy() { if (this.timer) clearInterval(this.timer); }
}
