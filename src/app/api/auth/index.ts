import { api } from "../api";
import { ResponseSuccess } from "../type";
import { FormLogin, FormRegister, LoginData } from "./type";

export const loginAction = async (form: FormLogin) => {
    try {
        const res = await api.post<ResponseSuccess<LoginData>>("/auth/login", form)
        console.log("res", res.data);

        if (res.data.success) {
            return res.data
        } else {
            throw new Error(res.data.message)
        }
    } catch (error: any) {
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
    } catch (error: any) {
        throw new Error(error.response.data.error + "")
    }
}