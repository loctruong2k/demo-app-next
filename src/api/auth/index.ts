import { AxiosError } from "axios";
import { ResponseApi, api } from "..";
import { ForgotPasswordForm, LoginData, LoginForm, RegisterForm } from "./type";

export const signInApi = async (form: LoginForm) => {
    try {
        const res = await api.post<ResponseApi<LoginData>>("/auth/login", form)
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error + "")
        }
        throw new Error(error + "")
    }
}

export const registerApi = async (form: RegisterForm) => {
    try {
        const res = await api.post<ResponseApi<string>>("/auth/register", form)
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error + "")
        }
        throw new Error(error + "")
    }
}

export const forgotPassword = async (form: ForgotPasswordForm) => {
    try {
        const res = await api.post<ResponseApi<string>>("/auth/forgot-password", form)
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error + "")
        }
        throw new Error(error + "")
    }
}