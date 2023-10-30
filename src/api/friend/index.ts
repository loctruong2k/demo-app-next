import { AxiosError } from "axios";
import { ResponseApi, api } from "..";
import { handleError } from "@/src/helpers/handleErrorAPI";
import { addTokenToRequest } from "@/src/helpers/getToken";

export const addFriend = async (id: string) => {
    try {
        const res = await api.post<ResponseApi<string>>("/friend/add", { id }, {
            headers: addTokenToRequest()
        })
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error: any) {
        handleError(error)
    }
}

export const unFriend = async (id: string) => {
    try {
        const res = await api.post<ResponseApi<string>>("/friend/unfriend", { id }, {
            headers: addTokenToRequest()
        })
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error: any) {
        handleError(error)
    }
}