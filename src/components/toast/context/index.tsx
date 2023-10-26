"use client"
import { createContext, useState } from 'react';
import { Toast } from '../type';
import ViewMessage from '../view';
export interface ToastContextValue {
    toasts: Toast[];
    setToasts: (toasts: Toast[]) => void;
}

const initData: ToastContextValue = {
    toasts: [],
    setToasts: () => { }
}

export const ToastContext = createContext<ToastContextValue>(initData);
export function ToastProvider({ children }: { children: React.ReactNode }) {

    const [toasts, setToasts] = useState<Toast[]>([]);

    return (
        <ToastContext.Provider value={{ toasts, setToasts }}>
            {children}
            <ViewMessage />
        </ToastContext.Provider>
    )
}