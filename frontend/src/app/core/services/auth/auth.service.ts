import { Injectable } from '@angular/core';
import { HttpBaseService } from '../http/http-base.service';
import { HttpClient } from '@angular/common/http';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse, MeResponse,
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

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload).pipe(
      tap((response) => {
        if (response && response.token) {
          this._authSessionService.setToken(response.token);
        }
      }),
    );
  }

  register(payload: RegisterRequest): Observable<ApiResponse<RegisterResponse>> {
    return this.http.post<ApiResponse<RegisterResponse>>(`${this.apiUrl}/register`, payload);
  }

  resendEmailVerification(payload: ResendEmailRequest): Observable<ApiResponse<VerificationResponse>> {
    return this.http.post<ApiResponse<VerificationResponse>>(`${this.apiUrl}/resend-email`, payload);
  }

  forgotPassword(payload: ForgotPasswordRequest): Observable<ApiResponse<ForgotPasswordResponse>> {
    return this.http.post<ApiResponse<ForgotPasswordResponse>>(`${this.apiUrl}/password/forgot`, payload);
  }

  resetPassword(token: string, email: string, payload: ResetPasswordRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/password/reset/${token}/${email}`, payload);
  }

  logout(): void {
    this._authSessionService.clearToken();
    this._authSessionService.clearProfile();
    this._router.navigate(['/auth/login']);
    location.reload();
  }

  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.apiUrl}/me`).pipe(
      tap((response) => {
        if(response.user){
          this._authSessionService.setProfile(JSON.stringify(response.user));
        }
      })
    );
  }
}
