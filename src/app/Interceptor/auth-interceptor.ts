import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';
import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Exkludera register och login endpoints från att få auth header. Ananrs så kommer dessa post också innehålla
  // En bearer token
  if (req.url.includes('/register') || req.url.includes('/login')) {
    return next(req);
  }

  // Lägg till Authorization-headern om användaren är autentiserad
  const addAuthHeader = (req: HttpRequest<any>) => {
    const token = localStorage.getItem('token');
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  };

  // Lägger till ovan header ifall användaren är inlogg och auth
  if (authService.isAuthenticated()) {
    const authRequest = addAuthHeader(req);
    return next(authRequest);
  } else {
    return next(req);
  }
};

