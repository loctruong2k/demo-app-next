import { addTokenToRequest } from "@/src/helpers/getToken"
import { ResponseApi, api } from ".."
import { InfoData } from "./type"


export const getInfo = async () => {
    try {
        const res = await api.get<ResponseApi<InfoData>>("/info", {
            headers: addTokenToRequest()
        })
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