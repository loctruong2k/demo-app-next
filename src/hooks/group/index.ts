"use client"

import { useEffect } from "react"
import { useSocket } from "../../socket-io/container/hook"
import { useQueryClient } from "@tanstack/react-query"
import { listGroupMembers } from "./list-members"
import { listImageGroup } from "./list-images"

export const useGroupDetail = () => {
    const socket = useSocket()
    const queryClient = useQueryClient()
    useEffect(() => {
        if (!socket) return
        listGroupMembers(socket, queryClient)
        listImageGroup(socket, queryClient)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
}