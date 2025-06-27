import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'register-page',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading = true;
    this.errorMessage = null;
    const { email, password, fullName } = this.registerForm.value;
    this.authService.register(email, password, fullName).subscribe({
      next: (ok) => {
        this.loading = false;
        if (ok) {
          this.router.navigateByUrl('/');
        } else {
          this.errorMessage = 'No se pudo registrar. Intenta de nuevo.';
        }
        // Aquí podrías redirigir o mostrar mensaje de éxito
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Error en el registro.';
      },
    });
  }
}
