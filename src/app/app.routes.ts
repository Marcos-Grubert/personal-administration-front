import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UserCadastroComponent } from './pages/register/users/user'; // Importe o componente que você criou
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  // NOVA ROTA: Cadastro de Usuários
  {
    path: 'usuarios/cadastro',
    component: UserCadastroComponent,
    canActivate: [authGuard] // Também protegido pelo guard
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];