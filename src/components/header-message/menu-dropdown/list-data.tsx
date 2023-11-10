export interface MenuDataChatsMessageType {
    icon: React.ReactNode;
    name: string;
    path: string;
    className?: string;
}

export enum MenuValueType {
    INFO = "1",
    SETTING = "2",
    OUT = "3"
}

export const ListMenuHeader: MenuDataChatsMessageType[] = [
    {
        icon: <i className="fa-solid fa-circle-info text-blue-500"></i>,
        name: "Thông tin nhóm",
        path: MenuValueType.INFO
    },
    {
        icon: <i className="fa-solid fa-gear text-blue-500"></i>,
        name: "Cài đặt",
        path: MenuValueType.SETTING
    },
    {
        icon: <i className="fa-solid fa-trash text-red-500"></i>,
        name: "Xoá & rời nhóm",
        path: MenuValueType.OUT,
        className: "text-red-500"
    }
]