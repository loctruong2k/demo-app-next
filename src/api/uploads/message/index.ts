import { handleError } from "@/src/helpers/handleErrorAPI";
import { ResponseApi, api } from "../..";
import { FileMessageData } from "./type";

export const uploadFileMessage = async (files: File[], groupId: string) => {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file)
        })
        const res = await api.post<ResponseApi<FileMessageData[]>>(`/upload/message/group/${groupId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if (res.data.success) {
            return res.data.data
        }
        throw new Error(res.data.error)
    } catch (error) {
        handleError(error)
    }
}

export const deleteFileMessage = async (ids: string[]) => {
    try {
        const res = await api.post<ResponseApi<string[]>>(`/upload/message/delete`, { ids: ids })
        return res
    } catch (error) {
        handleError(error)
    }
}