"use client"
import { useContext } from "react"
import { ToastContext, ToastContextValue } from "../context"
import { Toast } from "../type"
import { createView } from "../view/renderView";

interface ToastConfig {
    timer?: number;
    message: string;
    autoDismiss?: boolean;
}

const controlMessage = (toasts: ToastConfig, status: "error" | "success" | "warning") => {
    const id = Math.floor(Math.random() * 100001)
    const element = document.getElementById("box-message")
    if (element) {
        const length = element.children.length
        const viewString = createView(toasts.message, status)
        const newElement = document.createElement('div');
        newElement.id = id + ""
        newElement.innerHTML = viewString;
        element.appendChild(newElement);
        window.setTimeout(() => {
            destroyMessage(id)
        }, toasts.timer || 5000 + (length * 100))
    }
}

const destroyMessage = (id: number) => {
    const childMessage = document.getElementById(id.toString())
    if (!childMessage) return
    const childElement = childMessage.querySelector('div');
    if (childElement) {
        childElement.classList.remove("animate-[slide-show_0.3s_ease-in-out]")
        childElement.classList.add("animate-[slide-hide_0.5s_ease-in-out]")
    }
    window.setTimeout(() => {
        if (childMessage) {
            childMessage.remove();
        }
    }, 1000 * 0.5)
}

export const useToast = () => {
    const context = useContext<ToastContextValue>(ToastContext)
    const success = (toasts: ToastConfig) => {
        controlMessage(toasts, "success")
    }
    const error = (toasts: ToastConfig) => {
        controlMessage(toasts, "error")
    }
    const warning = (toasts: ToastConfig) => {
        controlMessage(toasts, "warning")
    }
    const destroy = (id?: number) => {
        if (id) {
            destroyMessage(id)
            return
        }
        const element = document.getElementById("box-message")
        if (element) {
            element.innerHTML = ""
        }
    }
    return { success, error, warning, destroy }
}