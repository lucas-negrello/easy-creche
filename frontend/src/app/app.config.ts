// Providers Imports
import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideHttpClient, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {routes} from './app.routes';

// Services Imports for Global Providers
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

// Locales imports
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

// Theme definitions from PrimeNG imports
import Material from '@primeng/themes/material'
import {definePreset} from '@primeng/themes';
import {authInterceptor} from './core/interceptors/auth/auth.interceptor';

// Locale registering
registerLocaleData(localePt);

// App configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: definePreset(
          Material,
          {
            semantic: {
              primary: {
                50: '{indigo.50}',
                100: '{indigo.100}',
                200: '{indigo.200}',
                300: '{indigo.300}',
                400: '{indigo.400}',
                500: '{indigo.500}',
                600: '{indigo.600}',
                700: '{indigo.700}',
                800: '{indigo.800}',
                900: '{indigo.900}',
                950: '{indigo.950}'
              }
            }
          }
        ),
        options: {
          darkModeSelector: '.dark',
        }
      }
    }),
    MessageService,
    DialogService,
    ConfirmationService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
};
