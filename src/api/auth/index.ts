import { ResponseApi, api } from "..";
import { LoginData, LoginForm } from "./type";

export const signInApi = async (form: LoginForm) => {
    try {
        const res = await api.post<ResponseApi<LoginData>>("/auth/login", form)
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error) {
        throw new Error(error + "")
    }
}