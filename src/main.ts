import {
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {
  bootstrapApplication,
  BrowserModule,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app/app.component';
import { JwtInterceptor } from './app/interceptors/jwt.interceptor';
import { appRoutes } from './app/routes/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,               // animaciones habilitadas
      ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-right', closeButton: true }),
      JwtModule.forRoot({                    // si aún lo necesitas
        config: {
          tokenGetter: () => localStorage.getItem('token'),
          allowedDomains: ['localhost:3000'],
          disallowedRoutes: ['localhost:3000/api/auth']
        }
      })
    ),
    provideAnimations(),                     // alternativa sencilla
    provideRouter(appRoutes),
     { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
}).catch(err => console.error(err));

