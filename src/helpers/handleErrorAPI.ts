
interface ErrorType {
    response: {
        data: {
            error: string
        }
    }
}
export const handleError = (error: any) => {
    const passError = error as ErrorType
    throw new Error(passError.response.data.error)
}