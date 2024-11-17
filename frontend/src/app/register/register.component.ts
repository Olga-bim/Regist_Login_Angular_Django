import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Импорт HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule], // Добавлено HttpClientModule
  template: `
    <div class="register-form">
      <h1>Register</h1>
      <form (ngSubmit)="onSubmit()">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" [(ngModel)]="username" required />

        <label for="email">Email</label>
        <input id="email" name="email" type="email" [(ngModel)]="email" required />

        <label for="password">Password</label>
        <input id="password" name="password" type="password" [(ngModel)]="password" required />

        <button type="submit">Register</button>
      </form>

      <p *ngIf="registrationSuccess" class="success-message">Registration successful!</p>
      <p *ngIf="registrationError" class="error-message">Error: {{ registrationError }}</p>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  registrationSuccess: boolean = false;
  registrationError: string | null = null;

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://127.0.0.1:8000/api/auth/register/', {
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        this.registrationSuccess = true;
        this.registrationError = null;
      },
      error: (err) => {
        this.registrationError = err.error.detail || 'An error occurred';
        this.registrationSuccess = false;
      }
    });
  }
}
