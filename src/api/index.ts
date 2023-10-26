import axios from "axios";
import { DB_HOST } from "./config";

export const api = axios.create({
    url: DB_HOST,
})

export interface ResponseApi<T> {
    success: boolean;
    data?: T,
    error?: string
}