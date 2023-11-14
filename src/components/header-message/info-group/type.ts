import { InfoData } from "@/src/api/info/type";

export interface MemberType {
    accountId: string;
    created_at: string;
    groupId: string;
    info: InfoData;
    isNotification: boolean;
    status: string;
    updated_at: string;
    _id: string;
}

export interface ImageType {
    fileId: string;
    messageId: string;
    name: string;
    size: number;
    url: string;
}