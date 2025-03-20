import { Injectable } from '@angular/core';

/**
 * Service responsible for handling authentication session.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthSessionService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly RESET_PASSWORD_KEY = 'reset_token';

  /**
   * Stores authentication token in localStorage.
   * @param token JWT authentication token.
   */
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Retrieves authentication token from localStorage.
   * @returns The stored authentication token or null if not found.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Clears authentication token from localStorage.
   */
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Checks if user is authenticated based on token existence.
   * @returns True if token exists, otherwise false.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
