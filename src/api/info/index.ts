import { addTokenToRequest } from "@/src/helpers/getToken"
import { ResponseApi, api } from ".."
import { InfoData, InfoSlugData } from "./type"
import { handleError } from "@/src/helpers/handleErrorAPI"

// thông tin người dùng đăng nhập
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
        handleError(error)
    }
}
// tìm kiếm theo tên người dùng fullname
export const searchFullName = async (txt: string) => {
    try {
        const res = await api.get<ResponseApi<InfoData[]>>("/info/search-name", {
            params: {
                keyword: txt
            },
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

// lấy thông tin info theo slug
export const getInfoSlug = async (slug: string) => {
    try {
        const res = await api.get<ResponseApi<InfoSlugData>>("/info/slug", {
            params: {
                slug: slug
            },
            headers: addTokenToRequest()
        })
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error) {
        handleError(error)
    }
}