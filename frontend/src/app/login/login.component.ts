import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule], // Добавлено HttpClientModule
  template: `
    <div class="login-form">
      <h1>Login</h1>
      <form (ngSubmit)="onSubmit()">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" [(ngModel)]="email" required />

        <label for="password">Password</label>
        <input id="password" name="password" type="password" [(ngModel)]="password" required />

        <button type="submit">Login</button>
      </form>

      <p *ngIf="loginSuccess" class="success-message">Login successful!</p>
      <p *ngIf="loginError" class="error-message">Error: {{ loginError }}</p>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginSuccess: boolean = false;
  loginError: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/auth/login/', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        localStorage.setItem('access', response.access);
        localStorage.setItem('refresh', response.refresh);
        this.loginSuccess = true;
        this.loginError = null;
      },
      error: (err) => {
        this.loginError = err.error.detail || 'Invalid login credentials';
        this.loginSuccess = false;
      }
    });
  }
}
