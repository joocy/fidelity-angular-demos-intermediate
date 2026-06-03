import { Routes } from '@angular/router';
import { PortalLayout }     from './portal/portal-layout';
import { PortalOverview }   from './portal/portal-overview';
import { authGuard }        from './auth.guard';

/**
 * Demonstrates:
 * 1. Nested routes (portal layout with child router-outlet)
 * 2. Lazy loading with loadComponent
 * 3. Functional guard with canActivate
 * 4. withComponentInputBinding (route params as input() signals)
 */
export const appRoutes: Routes = [
  { path: '', redirectTo: 'portal', pathMatch: 'full' },
  {
    path: 'portal',
    component: PortalLayout,            // layout component — has its own <router-outlet>
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: PortalOverview },
      {
        path: 'funds',
        canActivate: [authGuard],        // functional guard
        loadComponent: () =>             // lazy loaded
          import('./portal/funds-list').then(m => m.FundsList),
      },
      {
        path: 'funds/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./portal/fund-detail').then(m => m.FundDetail),
      },
    ],
  },
];
