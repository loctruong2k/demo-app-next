import React from "react";


export interface MenuType {
    icon: React.ReactNode,
    title: string,
    path: string,
    className?: string
}

export const ListMenuData: MenuType[] = [
    {
        icon: <i className="fa-solid fa-user text-blue-500"></i>,
        title: "Thông tin",
        path: "",
    },
    {
        icon: <i className="fa-solid fa-lock text-orange-500"></i>,
        title: "Đổi mật khẩu",
        path: "",
    },
    {
        icon: <i className="fa-solid fa-right-from-bracket"></i>,
        title: "Đăng xuất",
        path: "",
        className:"text-red-500"
    }
]