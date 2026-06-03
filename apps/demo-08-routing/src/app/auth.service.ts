import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loggedIn = signal(true);
  isLoggedIn = this._loggedIn.asReadonly();
  toggle() { this._loggedIn.update(v => !v); }
}
