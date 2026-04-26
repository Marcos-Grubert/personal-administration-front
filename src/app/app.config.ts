import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
// AJUSTE: O interceptor agora vem do arquivo próprio dele
import { authInterceptor } from './guards/auth-interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      // Registra o interceptor que criamos para injetar o token JWT
      withInterceptors([authInterceptor])
    ) 
  ]
};