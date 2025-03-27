import {RolesInterface, UserInterface} from '../user/user.interface';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    verification_url: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
}

export interface ResendEmailRequest {
  email: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  data: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  email: string;
  reset_token: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  new_password: string;
  new_password_confirmation: string;
}

export interface MeResponse {
  user: UserInterface;
  role: RolesInterface;
}
