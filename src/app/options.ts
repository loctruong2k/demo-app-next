import { configApp } from "@/constants/config";
import { PATH } from "@/constants/path";
import { DefaultUser } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAction } from "./api/auth";
interface MinimalUser extends DefaultUser {
    username: string;
    email: string;
    token: string;
}
export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text", },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req): Promise<MinimalUser> {
                const res = await loginAction({
                    username: credentials?.username + "",
                    password: credentials?.password + ""
                })
                return res.data
            }
        })
    ],
    pages: {
        signIn: PATH.login
    },
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: configApp.keyDB,
    },
};