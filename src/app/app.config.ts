import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {AuthInterceptor} from './Interceptor/auth-interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {RxStompServiceFactory} from './Services/rx-stomp.service-factory';
import {RxStomp} from '@stomp/rx-stomp';
import {provideNgxStripe} from 'ngx-stripe';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideNgxStripe('pk_test_51R1WwyPoXXCiJQgyVtclmvxl8DAYt6fUlu6PEfyk9jCAzUYFfEfE1thB7cZFj8SIqumBUhy7t8nH3TRv25uwfb56003IZEXoXm'),

    {
      provide: RxStomp,
      useFactory: RxStompServiceFactory,
    },
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          //ÄNDRA VID PROD
          allowedDomains: ['localhost:8080'], // Min backend URL
          disallowedRoutes: ['http://localhost:8080/api/v1/user/register', 'http://localhost:8080/api/v1/auth/login'] // Exkludera registrering från JWT
        }
      })
    )
  ]
};
