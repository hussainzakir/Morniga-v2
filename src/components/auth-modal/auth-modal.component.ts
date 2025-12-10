import { Component, ChangeDetectionStrategy, signal, effect, output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class AuthModalComponent {
  close = output<void>();

  isVisible = signal(false);
  view = signal<'login' | 'register'>('login');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private fb: FormBuilder) {
    effect(() => {
      // Use a timeout to allow the element to be added to the DOM before animating
      setTimeout(() => this.isVisible.set(true), 10);
    });
  }

  closeModal(): void {
    this.isVisible.set(false);
    // Allow animation to finish before emitting close event
    setTimeout(() => this.close.emit(), 300);
  }

  switchToRegister(): void {
    this.view.set('register');
  }

  switchToLogin(): void {
    this.view.set('login');
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login submitted:', this.loginForm.value);
      this.closeModal();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Register submitted:', this.registerForm.value);
      this.closeModal();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // Prevent clicks inside the modal from closing it
  onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
