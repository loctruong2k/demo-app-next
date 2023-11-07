import { InfoData } from "@/src/api/info/type";
import { FileMessageData } from "@/src/api/uploads/message/type";

export enum StatusValueChatLike {
    like = "1",
    sad = "2",
    fun = "3",
    love = "4",
}
export interface ChatLikeType {
    chatId: string,
    status: StatusValueChatLike,
    accountId: string,
}


export interface LikeMessageType {
    accountId: string
    chatId: string
    created_at: string
    updated_at: string
    value: string
    _id: string
}

export interface ItemMessageData {
    accountId: string,
    chatsLike: ChatLikeType[],
    content: string,
    created_at: string,
    files: FileMessageData[],
    groupId: string,
    info: InfoData,
    parentId: string,
    status: string,
    updated_at: string,
    _id: string,
    parentMessage?: ItemMessageData,
    parentMessageInfo?: InfoData,
    likeMessageList?: LikeMessageType[]
}

export interface ResponseListMessage {
    total: number,
    success: boolean,
    size: number,
    page: number,
    data: ItemMessageData[]
}