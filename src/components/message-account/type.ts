import { FileMessageData } from "@/src/api/uploads/message/type";

export interface MessageBoxType {
    accountId: string;
    groupId: string;
}

export interface MessageForm {
    content: string;
    groupId?: string;
    parentId?: string;
    files: FileMessageData[]
}