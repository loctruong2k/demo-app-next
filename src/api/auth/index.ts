import { addTokenToRequest } from "@/src/helpers/getToken";
import { handleError } from "@/src/helpers/handleErrorAPI";
import { ResponseApi, api } from "..";
import { ForgotPasswordForm, LoginData, LoginForm, RegisterForm } from "./type";

export const signInApi = async (form: LoginForm) => {
    try {
        const res = await api.post<ResponseApi<LoginData>>("/auth/login", form)
        if (res?.data?.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error: any) {        
        handleError(error)
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
        handleError(error)
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
        handleError(error)
    }
}

export const verifyTokenAPI = async () => {
    try {
        const res = await api.get<ResponseApi<string>>("/auth/verify-token", {
            headers: addTokenToRequest()
        })
        if (res.data.success) {
            return res.data
        } else {
            throw new Error(res.data.error)
        }
    } catch (error) {
        handleError(error)
    }
}

export const firebaseAuth = async () => {
    
}