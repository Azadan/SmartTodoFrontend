import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';

const redirectToLogin = (router: Router) => {
  router.navigate(['/login']);
  return false;
}

const checkRole = (predicate : () => boolean): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return redirectToLogin(router);
  }

  if (predicate()) {
    return true;
  }
  return redirectToLogin(router);
}

export const adminGuard: CanActivateFn = () =>
  checkRole(() => inject(AuthService).isAdmin());

export const userGuard: CanActivateFn = () =>
  checkRole(() => inject(AuthService).isStandardUser());
