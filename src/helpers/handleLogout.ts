import { QueryClient } from "@tanstack/react-query";

export const handleLogout = (queryClient: QueryClient) => {
    localStorage.clear();
    queryClient.clear();
    window.location.reload();
}