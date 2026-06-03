import { Component, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { FundService, Fund } from './fund.service';

/**
 * Demonstrates the key RxJS patterns for the intermediate course:
 *
 *  1. Subject.next() — push values into an observable
 *  2. debounceTime()  — wait for the user to stop typing
 *  3. distinctUntilChanged() — skip if the value hasn't changed
 *  4. switchMap()     — cancel the previous search, start a new one
 *  5. toSignal()      — bridge Observable → Signal for clean template binding
 *  6. takeUntil() — auto-cleanup
 */
@Component({
  selector: 'app-root',
  imports: [],
  template: `
    <nav><strong>Apex Asset Management</strong><span>Demo 06: RxJS</span></nav>
    <div style="padding:1.5rem;max-width:800px;margin:0 auto">

      <div class="card">
        <h2>Fund Search — switchMap + toSignal</h2>
        <p style="font-size:0.85rem;color:#6b7280;margin-bottom:0.75rem">
          Type quickly — notice only the LAST search fires (switchMap cancels earlier ones).
          Open Network tab to observe cancelled requests (with a real API).
        </p>
        <input placeholder="Search by name or sector..."
          style="width:100%;margin-bottom:1rem"
          (input)="onSearch($event)" />

        @if (funds() === undefined) {
          <p style="color:#aaa">Loading...</p>
        } @else {
          <table>
            <thead><tr><th>Name</th><th>Sector</th><th>YTD Return</th></tr></thead>
            <tbody>
              @for (f of funds(); track f.id) {
                <tr>
                  <td><strong>{{ f.name }}</strong></td>
                  <td>{{ f.sector }}</td>
                  <td [style.color]="f.ytdReturn>=0?'#155724':'#721c24'">
                    {{ f.ytdReturn>=0?'+':'' }}{{ f.ytdReturn }}%
                  </td>
                </tr>
              } @empty {
                <tr><td colspan="3" style="color:#aaa;text-align:center">No funds match</td></tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
})
export class App {
  private svc = inject(FundService);

  // Subject: we push values in, observables flow out
  private search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  // switchMap: cancels previous search when a new term arrives
  // toSignal: converts the observable to a signal — no | async pipe needed
  funds = toSignal(
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(q => this.svc.search(q)),
      takeUntil(this.destroy$),    // auto-unsubscribe — no ngOnDestroy needed
    )
  );

  constructor() {
    this.search$.next(''); // trigger initial load
  }

  onSearch(event: Event) {
    this.search$.next((event.target as HTMLInputElement).value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
