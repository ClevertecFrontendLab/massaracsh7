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
