import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  menuCadastros: boolean = false;
  menuFinancas: boolean = false;

  subMenuUsuarios: boolean = false;
  subMenuReceber: boolean = false;
  subMenuPagar: boolean = false;

  constructor() {}
}
