import { emitKeys } from "@/src/constants/emitKeys";
import { queryKeys } from "@/src/constants/query-key";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

export const listGroupMembers = (socket: Socket, queryClient: QueryClient) => {
    socket.on(emitKeys.group.listMember, (data) => {
        if (data.success) {
            queryClient.setQueryData([queryKeys.group_message.listMember, data.groupId], data.data)
        }
    })
}