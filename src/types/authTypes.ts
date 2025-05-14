export interface SignUpRequest {
    email: string;
    login: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

export interface SignUpResponse {
    statusText: string;
    message: string;
}

export interface LoginRequest {
    login: string;
    password: string;
}

export interface LoginResponse {
    statusText: string;
    message: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    statusText: string;
    message: string;
}

export interface VerifyOtpRequest {
    email: string;
    otpToken: string;
}

export interface VerifyOtpResponse {
    statusText: string;
    message: string;
}

export interface ResetPasswordRequest {
    login: string;
    password: string;
    passwordConfirm: string;
}

export interface ResetPasswordResponse {
    statusText: string;
    message: string;
}
