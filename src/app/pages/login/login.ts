import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html', // <--- Se o arquivo chama login.html, deixe assim
  styleUrl: './login.scss'     // <--- Se o arquivo chama login.scss, deixe assim
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Aqui criamos o controle do formulário
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login ok!', res);
          alert('Autenticado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          if(err.status === 401) {
            const message = err.error?.message || 'Não autorizado.';
            console.warn('Erro 401 identificado:', message);
            alert(`Falha no acesso: ${message}`);
          } else {
            console.error('Outro erro ocorreu: ', err);
            alert('Ocorreu um erro inesperado no servidor.');
          }
        }
      });
    }
  }
}
