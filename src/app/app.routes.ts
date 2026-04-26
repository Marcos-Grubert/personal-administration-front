import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login'; // Verifique se o caminho do seu arquivo é esse mesmo

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**', // Rota para quando digitar algo que não existe
    redirectTo: 'login'
  }
];
