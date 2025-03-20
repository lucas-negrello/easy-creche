import { Injectable } from '@angular/core';
import { HttpBaseService } from '../http/http-base.service';
import { HttpClient } from '@angular/common/http';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResendEmailRequest,
  ResetPasswordRequest,
  VerificationResponse,
} from '../../interfaces/auth/auth.interface';
import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../interfaces/http/api-response.interface';
import { AuthSessionService } from './auth-session.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpBaseService<unknown> {
  /** Authentication resource path */
  protected override resource: string = 'auth';

  constructor(
    protected override http: HttpClient,
    private readonly _authSessionService: AuthSessionService,
    private readonly _router: Router,
  ) {
    super(http);
  }

  /**
   * Handles user login and stores the authentication token.
   * @param payload LoginRequest object containing email and password.
   */
  login(payload: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => {
        if (response.success && response.data?.token) {
          this._authSessionService.setToken(response.data.token);
        }
      }),
    );
  }

  /**
   * Handles user registration.
   * @param payload RegisterRequest object containing user details.
   */
  register(payload: RegisterRequest): Observable<ApiResponse<RegisterResponse>> {
    return this.http.post<ApiResponse<RegisterResponse>>(`${this.apiUrl}/register`, payload);
  }

  /**
   * Resends email verification.
   * @param payload ResendEmailRequest containing email.
   */
  resendEmailVerification(payload: ResendEmailRequest): Observable<ApiResponse<VerificationResponse>> {
    return this.http.post<ApiResponse<VerificationResponse>>(`${this.apiUrl}/resend-email`, payload);
  }

  /**
   * Handles forgot password request.
   * @param payload ForgotPasswordRequest object containing email.
   */
  forgotPassword(payload: ForgotPasswordRequest): Observable<ApiResponse<ForgotPasswordResponse>> {
    return this.http.post<ApiResponse<ForgotPasswordResponse>>(`${this.apiUrl}/password/forgot`, payload);
  }

  /**
   * Handles password reset.
   * @param payload ResetPasswordRequest object containing email, token, and new password.
   */
  resetPassword(payload: ResetPasswordRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/password/reset`, payload);
  }

  /**
   * Logs out user and clears authentication token.
   */
  logout(): void {
    this._authSessionService.clearToken();
    this._router.navigate(['/auth/login']);
  }
}
