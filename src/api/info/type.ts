export interface InfoData {
    id: string;
    accountID: string;
    fullName: string;
    nickname: string;
    avatar: string;
    background: string;
    slug: string;
    address: string;
    birthday: Date;
    numberPhone: number;
    description: string;
    status: string,
    created_at: Date
}

export interface FriendData {
    friendId: string;
    accountID: string;
    status: string,
}

export interface InfoSlugData {
    info: InfoData,
    friend: FriendData
}