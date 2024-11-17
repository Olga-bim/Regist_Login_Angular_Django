import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Импортируем FormsModule для использования ngModel
import { CommonModule } from '@angular/common';  // Импортируем CommonModule для использования директив ngIf, ngFor

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Добавляем CommonModule в imports
  template: `
    <div class="login-form">
      <h1>Login</h1>
      <form (ngSubmit)="onSubmit()">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" [(ngModel)]="username" required />

        <label for="password">Password</label>
        <input id="password" name="password" type="password" [(ngModel)]="password" required />

        <button type="submit">Login</button>
      </form>

      <p *ngIf="loginSuccess" class="success-message">Login successful!</p>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginSuccess: boolean = false;

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.loginSuccess = true; // Устанавливаем флаг успешного логина
  }
}
