import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UsersService } from './services/users.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth:UsersService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.auth.getToken();
      if (token) {
          const cloned = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`)
          });
          return next.handle(cloned);
      } else {
          return next.handle(req);
      }
  }
}











