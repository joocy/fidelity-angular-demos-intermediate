import { InjectionToken } from '@angular/core';

/**
 * InjectionToken: type-safe token for a non-class dependency.
 * Because this is just a string (not a class), we can't use it directly as a token.
 * InjectionToken gives it a unique identity AND lets TypeScript know the type.
 */
export const API_URL = new InjectionToken<string>('ApiUrl');
