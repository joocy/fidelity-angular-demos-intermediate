import { Component, Input, OnInit, OnChanges, OnDestroy, AfterViewInit,
         SimpleChanges, inject, signal, ChangeDetectionStrategy } from '@angular/core';

/**
 * Demonstrates all four key lifecycle hooks.
 * Open the browser console to see the exact order they fire in.
 *
 * Order on first render:  constructor → ngOnChanges → ngOnInit → ngAfterViewInit
 * On @Input() change:     ngOnChanges (only)
 * On destroy:             ngOnDestroy
 */
@Component({
  selector: 'app-fund-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card">
      <h2>Fund: {{ fundId }}</h2>
      <p>Check the browser console for lifecycle hook logs.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;font-size:0.85rem">
        @for (entry of log(); track $index) {
          <div [style.color]="entry.color" style="padding:0.2rem 0;border-bottom:1px solid #f0f2f5">
            {{ entry.hook }}
          </div>
          <div style="color:#6b7280;padding:0.2rem 0;border-bottom:1px solid #f0f2f5">{{ entry.note }}</div>
        }
      </div>
      <p style="font-size:0.8rem;color:#aaa;margin-top:0.75rem">Timer ticks: {{ ticks() }}</p>
    </div>
  `,
})
export class FundDetail implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() fundId!: string;

  log    = signal<{hook:string;note:string;color:string}[]>([]);
  ticks  = signal(0);
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.addLog('constructor', 'DI available. @Input() NOT set yet.', '#6b7280');
    console.log('constructor — fundId is:', this.fundId, '(undefined at this point)');
  }

  ngOnChanges(changes: SimpleChanges) {
    const first = changes['fundId']?.firstChange;
    this.addLog('ngOnChanges', first ? 'First render — @Input() now set' : 'fundId changed to: ' + this.fundId, '#1a3a6b');
    console.log('ngOnChanges — fundId:', this.fundId, '| firstChange:', first);
  }

  ngOnInit() {
    this.addLog('ngOnInit', 'Safe to use @Input() values. Start HTTP calls here.', '#155724');
    console.log('ngOnInit — fundId:', this.fundId);
    this.timer = setInterval(() => this.ticks.update(n => n + 1), 1000);
  }

  ngAfterViewInit() {
    this.addLog('ngAfterViewInit', 'Template rendered. Safe for @ViewChild access.', '#856404');
    console.log('ngAfterViewInit — view is ready');
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
    console.log('ngOnDestroy — cleaned up timer');
  }

  private addLog(hook: string, note: string, color: string) {
    this.log.update(l => [...l, { hook, note, color }]);
  }
}
