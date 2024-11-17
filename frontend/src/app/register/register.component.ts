import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Импортируем FormsModule для использования ngModel
import { CommonModule } from '@angular/common';  // Импортируем CommonModule для использования директив ngIf, ngFor

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Добавляем CommonModule в imports
  template: `
    <div class="register-form">
      <h1>Register</h1>
      <form (ngSubmit)="onSubmit()">
        <label for="username">Username</label>
        <input id="username" name="username" type="text" [(ngModel)]="username" required />

        <label for="password">Password</label>
        <input id="password" name="password" type="password" [(ngModel)]="password" required />

        <button type="submit">Register</button>
      </form>

      <p *ngIf="registrationSuccess" class="success-message">Registration successful!</p>
    </div>
  `,
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  registrationSuccess: boolean = false;

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.registrationSuccess = true; // Устанавливаем флаг успешной регистрации
  }
}
