import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UserCadastroComponent } from './pages/register/users/register/user'; // Importe o componente que você criou
import { authGuard } from './guards/auth-guard';
import { ConsultComponent } from './pages/register/users/consult/consult'
import { AccountsReceivableCreateComponent } from './pages/financial/accountsreceivable/accountsreceivablecreate/accontsreceivablecreate';
import { AccountsReceivableMovementsComponent } from './pages/financial/accountsreceivable/accounts-receivable-movements/accounts-receivable-movements';

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
  // Rotas dos menus de cadastros
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
  //Rotas do financeiro
  {
    path: 'contasareceber/cadastro',
    component: AccountsReceivableCreateComponent,
    canActivate: [authGuard]
  }
  ,
    {
    path: 'contasareceber/baixas',
    component: AccountsReceivableMovementsComponent,
    canActivate: [authGuard]
  }
  ,
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