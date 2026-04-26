import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth'; // Verifique se o caminho do seu AuthService está correto

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // O Guard verifica se o usuário pode acessar a rota (vê se está logado)
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // Se não estiver logado, redireciona para o login
    router.navigate(['/login']);
    return false;
  }
};