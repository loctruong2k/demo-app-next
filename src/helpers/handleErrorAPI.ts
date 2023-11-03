
interface ErrorType {
    response: {
        data: {
            error: string
        }
    }
}
export const handleError = (error: any) => {
    if(error.code === "ERR_NETWORK"){
        throw new Error(error.message)
    }
    const passError = error as ErrorType
    throw new Error(passError.response.data.error)
}