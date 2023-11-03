"use client"
import { DB_HOST } from '@/src/api/config';
import { keyPath } from '@/src/constants/keyPath';
import { queryKeys } from '@/src/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import MyContextSocket from './context';
interface Props {
    children: React.ReactNode
}
function ContainerSocket({ children }: Props) {
    const [socket, setSocket] = useState<Socket | null>(null)
    const { data: txtToken } = useQuery<string>({
        queryKey: [queryKeys.token]
    })
    useEffect(() => {
        if (!txtToken) {
            if (socket) {
                socket.disconnect();
                setSocket(null)
            }
            return
        }
        const token = localStorage.getItem(keyPath.token);
        const socketIo = io(DB_HOST, {
            reconnection: true,
            autoConnect: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: Infinity,
            query: { token: "Bearer " + token },
        });
        setSocket(socketIo)
        socketIo.on("ping", () => {
            socketIo.emit("pong");
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [txtToken])
    return (
        <MyContextSocket.Provider value={socket}>
            {children}
        </MyContextSocket.Provider>
    )
}

export { ContainerSocket };
