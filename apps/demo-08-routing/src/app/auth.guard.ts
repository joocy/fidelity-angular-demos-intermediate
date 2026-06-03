import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Functional guard — no class required. inject() gives full DI access. */
export const authGuard = () => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  // Return true to allow, or a UrlTree to redirect
  return auth.isLoggedIn() || router.createUrlTree(['/portal/overview']);
};
