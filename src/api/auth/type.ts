export interface LoginForm {
    username: string;
    password: string;
}

export interface LoginData {
    username: string;
    id: string;
    token: string;
}

export interface RegisterForm {
    username: string;
    password: string;
    email: string;
}

export interface ForgotPasswordForm {
    email: string;
}