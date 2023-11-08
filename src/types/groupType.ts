import { TimeLine } from ".";
import { InfoData } from "../api/info/type";

export interface GroupSettingType extends TimeLine {
    background: string;
    groupId: string;
    logo: string;
    _id: string;
}

export interface GroupType extends TimeLine {
    name: string;
    _id: string;
}

export interface ChatMessageType extends TimeLine {
    accountId: string;
    content: string;
    files: string[];
    groupId: string;
    parentId: string;
    _id: string;
}

export interface ListGroupType {
    groupSettings: GroupSettingType;
    groups: GroupType;
    chatMessages: ChatMessageType;
    _id: string;
    accountInfo: InfoData
}