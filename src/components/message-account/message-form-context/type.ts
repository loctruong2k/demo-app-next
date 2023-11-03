import { InfoData } from "@/src/api/info/type";
import { MessageItemData } from "../list-message/type";
import { MessageForm } from "../type";

export interface MemberGroup {
    accountId: string,
    created_at: string,
    groupId: string,
    isNotification: boolean,
    status: string,
    updated_at: string,
    _id: string,
}

export interface SettingGroup {
    background: string,
    created_at: string,
    groupId: string,
    logo: string,
    status: string,
    updated_at: string,
    _id: string,
}

export interface MessageFormContextType {
    id: string,
    userInfo?: InfoData,
    members?: MemberGroup[],
    setting?: SettingGroup,
    parentItem?: MessageItemData,
    messagePending?: MessageForm
}

export interface ContextType {
    data: MessageFormContextType,
    handleChange: (key: keyContext, value?: any) => void
}

export enum keyContext {
    SendMessage = "SendMessage"
}