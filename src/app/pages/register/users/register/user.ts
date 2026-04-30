import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/register/users/register/user';

@Component({
  selector: 'app-user-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.html',    // OK: bate com o nome na sua pasta
  styleUrl: './user.scss'        // AJUSTADO: na imagem o arquivo é user.scss
})
export class UserCadastroComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.register(this.userForm.value).subscribe({
        next: (response) => {
          alert('Usuário cadastrado com sucesso!');
          this.userForm.reset();
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          alert('Erro ao realizar cadastro.');
        }
      });
    }
  }
}