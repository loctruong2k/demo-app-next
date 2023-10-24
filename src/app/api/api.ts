import { configApp } from "@/constants/config";
import axios, { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { ResponseError } from "./type";

export const isServer = () => {
    return typeof window === "undefined";
}
let accessToken = "";
export let context = <GetServerSidePropsContext>{};
const baseURL = configApp.domain;

export const setAccessToken = (_accessToken: string) => {
    accessToken = _accessToken
}

export const getAccessToken = () => (accessToken)

export const setContext = (_context: GetServerSidePropsContext) => {
    context = _context;
}

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // to send cookie
})

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    if (isServer() && context?.req?.cookies) {
        config.headers.Cookie = `gid=${context.req.cookies.gid};`
    }
    return config;
});

api.interceptors.response.use(
    response => {
        return response;
    },
    (error: AxiosError<ResponseError>) => {
        // check conditions to refresh token
        if (error.response?.status === 401 && error.response.data.status === 2) {
            // return refreshToken(error);
        }
        return Promise.reject(error);
    }
)
