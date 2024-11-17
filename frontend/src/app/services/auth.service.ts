import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000'; // Базовый URL API
  private accessTokenKey = 'access';
  private refreshTokenKey = 'refresh';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Вход пользователя с сохранением токенов
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { email, password }).pipe(
      tap((response: any) => {
        this.storeTokens(response.access, response.refresh);
      }),
      catchError(this.handleError('login'))
    );
  }

  /**
   * Регистрация нового пользователя
   */
  register(email: string, username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { email, username, password }).pipe(
      catchError(this.handleError('register'))
    );
  }

  /**
   * Проверка авторизации пользователя
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  /**
   * Получение текущего токена доступа
   */
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  /**
   * Обновление токена доступа
   */
  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem(this.refreshTokenKey);
    if (!refresh) {
      this.logout(); // Если токен отсутствует, выполняем выход
      return of(null);
    }

    return this.http.post(`${this.apiUrl}/token/refresh/`, { refresh }).pipe(
      tap((response: any) => {
        this.storeTokens(response.access, refresh);
      }),
      catchError(err => {
        this.logout(); // Если обновление токена не удалось, выходим
        return of(null);
      })
    );
  }

  /**
   * Выход пользователя
   */
  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.router.navigate(['/login']); // Перенаправляем на страницу входа
  }

  /**
   * Хранение токенов в localStorage
   */
  private storeTokens(access: string, refresh: string): void {
    localStorage.setItem(this.accessTokenKey, access);
    localStorage.setItem(this.refreshTokenKey, refresh);
  }

  /**
   * Обработка ошибок
   */
  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result);
    };
  }
}
