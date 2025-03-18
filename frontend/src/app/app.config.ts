// Providers Imports
import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {routes} from './app.routes';

// Services Imports for Global Providers
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

// Locales imports
import {registerLocaleData} from '@angular/common';
import localePt from '@angular/common/locales/pt';

// Theme definitions from PrimeNG imports
import Material from '@primeng/themes/material'

// Locale registering
registerLocaleData(localePt);

// App configuration
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }),
    MessageService,
    DialogService,
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]
};
