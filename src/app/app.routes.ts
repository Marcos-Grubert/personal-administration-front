import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UserCadastroComponent } from './pages/register/users/register/user'; // Importe o componente que você criou
import { authGuard } from './guards/auth-guard';
import { ConsultComponent } from './pages/register/users/consult/consult'

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
    path: 'usuarios/consulta',
    component: ConsultComponent,
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