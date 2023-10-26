export interface Toast {
    id: number;
    message: string;
    autoDismiss: boolean;
    status: "success" | "error" | "warning"
}