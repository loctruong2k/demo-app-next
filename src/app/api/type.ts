export interface ResponseSuccess<T> {
    status: number;
    data: T;
    message?: string;
}

export interface ResponseError {
    status: number;
    message: string;
}