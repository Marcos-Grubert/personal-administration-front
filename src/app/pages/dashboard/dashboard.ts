import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  userName: string = 'Desenvolvedor';
  
  // Nível 1
  menuCadastros: boolean = false;
  menuFinancas: boolean = false;

  // Nível 2 (Aninhados)
  subMenuReceber: boolean = false;
  subMenuPagar: boolean = false;
  subMenuUsuarios: boolean = false; // Novo controle

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userName = 'Desenvolvedor'; 
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}