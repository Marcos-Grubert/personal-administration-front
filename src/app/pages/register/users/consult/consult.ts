import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../services/auth';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/register/users/register/user';
import { User } from '../models/user'

@Component({
  selector: 'app-consult',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: '././consult.html',
  styleUrl: './consult.scss'
})
export class ConsultComponent implements OnInit {
  
  // Nível 1
  menuCadastros: boolean = false;
  menuFinancas: boolean = false;

  // Nível 2 (Aninhados)
  subMenuReceber: boolean = false;
  subMenuPagar: boolean = false;
  subMenuUsuarios: boolean = false; // Novo controle

  users: Array<User> = [];
  userName: string = 'Desenvolvedor';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.showUsers();
  }

  showUsers(): void {
    this.userService.consultUsers().subscribe({
      next: (dados) => {
        this.users = dados;
      },
      error: (err) => {
        console.log('Erro ao buscar usuários', err);
      }
    });
  }

  inativeUsers(id: number): void {
    if(confirm('Deseja realmente inativar este usuário?')){
      this.userService.inativeUser(id).subscribe({
        next: () => this.showUsers()
      });
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}