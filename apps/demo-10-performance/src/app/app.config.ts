import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
// Zone.js enabled so OnPush vs Default difference is visible
export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideZoneChangeDetection({ eventCoalescing: true })],
};
