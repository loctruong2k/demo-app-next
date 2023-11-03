"use client"
import { createContext } from 'react';
import { Socket } from 'socket.io-client';
const MyContextSocket = createContext<Socket | null>(null);
export default MyContextSocket;