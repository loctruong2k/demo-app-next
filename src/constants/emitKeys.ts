export const emitKeys = {
    group: {
        list: "/group/list",
        create: "/group/create", // thêm mới group
        changeName: "/group/change-name", // thay đổi tên nhóm
        addMember: "/group/add-member", // thêm người mới vào group chats
        idAccount: "/group/id-account", // kiểm tra xem có từng chats riêng với 1 id người dùng hay không
        infoGroup: "/group/info-group", // lấy thông tin của một group
        infoAccount: "/group/info-account", // lấy thông tin người nhắn
    },
    notification: {
        index: "/notification" // gửi thông báo
    }
}