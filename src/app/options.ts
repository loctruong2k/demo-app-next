import { configApp } from "@/constants/config";
import { PATH } from "@/constants/path";
import { DefaultUser } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAction } from "./api/auth";
import { JWT } from "next-auth/jwt";

interface MinimalUser extends DefaultUser {
    username: string;
    id: string;
    token: string;
}
export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text", },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req): Promise<MinimalUser | null> {
                
                const res = await loginAction({
                    username: credentials?.username + "",
                    password: credentials?.password + ""
                })
                if (res.data) {
                    return res.data
                }
                return null;
            }
        })
    ],
    callbacks: {
        session: async ({ session, token }) => {
            return Promise.resolve(session);
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        }
    },

    pages: {
        signIn: PATH.login,
        signOut: PATH.login
    },
    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: configApp.keyDB,
    },
};