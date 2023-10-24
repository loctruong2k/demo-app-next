import { api } from "../api";
import { ResponseSuccess } from "../type";
import { FormLogin, FormRegister, LoginData } from "./type";

export const loginAction = async (form: FormLogin) => {
    try {
        const res = await api.post<ResponseSuccess<LoginData>>("/auth/login", form, { headers: { "Content-Type": "application/json" } })
        if (res.status === 200) {
            return res.data
        }
        throw new Error(res.data.message)
    } catch (error) {
        throw new Error(error + "")
    }
}

export const registerAction = async (form: FormRegister) => {
    try {
        const res = await api.post("/auth/register", form)
        if (res.status === 200) {
            return res.data
        }
        throw new Error(res.data.message)
    } catch (error) {
        throw new Error(error + "")
    }
}