import axios from "axios";
import { DB_HOST } from "./config";
axios.defaults.baseURL = DB_HOST
export const api = axios.create({
    baseURL: DB_HOST,
})

export interface ResponseApi<T> {
    success: boolean;
    data?: T,
    error?: string
}