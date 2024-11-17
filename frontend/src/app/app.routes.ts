// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Главная страница
  { path: 'register', component: RegisterComponent }, // Страница регистрации
  { path: 'login', component: LoginComponent } // Страница входа
];
