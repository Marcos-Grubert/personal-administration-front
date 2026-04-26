import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Verificamos se o token existe (usando aquele método que criamos no AuthService)
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // Se não está logado, manda pro login
    router.navigate(['/login']);
    return false;
  }
};
