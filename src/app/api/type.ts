export interface ResponseSuccess<T> {
    success: boolean;
    data: T;
    message?: string;
}

export interface ResponseError {
    success: boolean;
    error: string;
}