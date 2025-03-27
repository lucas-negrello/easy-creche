import { Injectable } from '@angular/core';

/**
 * Service responsible for handling authentication session.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthSessionService {
  private readonly TOKEN_KEY = 'token';
  private readonly RESET_PASSWORD_KEY = 'reset_token';
  private readonly PROFILE_KEY = 'profile';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setProfile(profile: string): void {
    localStorage.setItem(this.PROFILE_KEY, profile);
  }

  getProfile(): string | null {
    return localStorage.getItem(this.PROFILE_KEY);
  }

  clearProfile(): void {
    localStorage.removeItem(this.PROFILE_KEY);
  }
  hasProfile(): boolean {
    return !!this.getProfile();
  }
}
