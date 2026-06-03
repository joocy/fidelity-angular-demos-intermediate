import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Fund { id:string; name:string; sector:string; ytdReturn:number; }

const ALL_FUNDS: Fund[] = [
  { id:'1', name:'Apex UK Equity',        sector:'Equity',      ytdReturn: 8.4 },
  { id:'2', name:'Apex Government Bond',  sector:'Fixed Income',ytdReturn: 2.1 },
  { id:'3', name:'Apex Emerging Markets', sector:'Equity',      ytdReturn:14.7 },
  { id:'4', name:'Apex Multi-Asset',      sector:'Multi-Asset', ytdReturn: 5.9 },
  { id:'5', name:'Apex Property Fund',    sector:'Real Estate', ytdReturn: 3.2 },
];

@Injectable({ providedIn: 'root' })
export class FundService {
  search(query: string): Observable<Fund[]> {
    const q = query.toLowerCase();
    const results = q
      ? ALL_FUNDS.filter(f => f.name.toLowerCase().includes(q) || f.sector.toLowerCase().includes(q))
      : ALL_FUNDS;
    // Simulate network latency — makes switchMap's cancellation visible
    return of(results).pipe(delay(300));
  }
}
