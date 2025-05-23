type BaseResponse = {
    statusText: string;
    message: string;
};

export type SignUpRequest = {
    email: string;
    login: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export type SignUpResponse = BaseResponse;

export type LoginRequest = {
    login: string;
    password: string;
};

export type LoginResponse = BaseResponse;

export type ForgotPasswordRequest = {
    email: string;
};

export type ForgotPasswordResponse = BaseResponse;

export type VerifyOtpRequest = {
    email: string;
    otpToken: string;
};

export type VerifyOtpResponse = BaseResponse;

export type ResetPasswordRequest = {
    login: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

export type ResetPasswordResponse = BaseResponse;
