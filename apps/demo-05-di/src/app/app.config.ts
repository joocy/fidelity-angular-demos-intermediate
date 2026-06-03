import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { API_URL } from './api-url.token';
import { ConsoleLogger } from './logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    { provide: API_URL, useValue: 'https://api.apex.com/v1' },
    ConsoleLogger,
  ],
};
