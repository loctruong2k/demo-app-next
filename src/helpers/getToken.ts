import { keyPath } from "../constants/keyPath"

export const getToken = () => {
    return localStorage.getItem(keyPath.token)
}

export const addTokenToRequest = () => {
    return {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
    }
}