import { emitKeys } from "@/src/constants/emitKeys";
import { queryKeys } from "@/src/constants/query-key";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

export const listImageGroup = (socket: Socket, queryClient: QueryClient) => {
    socket.on(emitKeys.group.listImages, (data) => {
        if (data.success) {
            queryClient.setQueryData([queryKeys.group_message.listImage, data.groupId], data.data)
        }
    })
}