export interface MessageBoxType {
    accountId: string;
    groupId: string;
}

export interface MessageForm {
    content: string;
    groupId?: string;
    parentId?: string;
    files: File[]
}