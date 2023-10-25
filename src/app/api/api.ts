import { configApp } from "@/constants/config";
import axios from "axios";

const baseURL = configApp.domain;
export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // to send cookie
})