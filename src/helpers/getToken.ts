export const getToken = () => {
    return localStorage.getItem("xyz")
}

export const addTokenToRequest = () => {
    return {
        'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
    }
}