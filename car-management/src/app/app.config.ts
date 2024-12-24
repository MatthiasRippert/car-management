import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/aura';


export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(withFetch()), provideAnimationsAsync(), providePrimeNG({ theme: { preset: Material, options: {darkModeSelector: false} } })]
};
