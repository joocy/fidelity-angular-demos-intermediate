import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-portal-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div style="display:grid;grid-template-columns:180px 1fr;min-height:calc(100vh - 48px)">
      <aside style="background:#1a3a6b;padding:1rem;display:flex;flex-direction:column;gap:0.5rem">
        <a routerLink="/portal/overview" routerLinkActive="active"
           style="color:#a8bccf;text-decoration:none;padding:0.4rem 0.5rem;border-radius:4px;font-size:0.9rem">
           Overview
        </a>
        <a routerLink="/portal/funds"    routerLinkActive="active"
           style="color:#a8bccf;text-decoration:none;padding:0.4rem 0.5rem;border-radius:4px;font-size:0.9rem">
           Funds {{ auth.isLoggedIn() ? '' : '🔒' }}
        </a>
        <div style="margin-top:auto;font-size:0.8rem;color:#6b9ac4;cursor:pointer" (click)="auth.toggle()">
          {{ auth.isLoggedIn() ? '🔓 Log out' : '🔒 Log in' }}
        </div>
      </aside>
      <!-- Child routes render here -->
      <main style="padding:1.5rem"><router-outlet /></main>
    </div>
  `,
})
export class PortalLayout { auth = inject(AuthService); }
