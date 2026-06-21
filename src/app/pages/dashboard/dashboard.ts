import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
// Importe o SidebarComponent com o caminho correto do seu projeto
import { SidebarComponent } from '../../core/components/sidebar/sidebar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  userName: string = 'Desenvolvedor';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.userName = 'Desenvolvedor'; 
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}