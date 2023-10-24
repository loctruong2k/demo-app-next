import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';
import { PATH } from './constants/path';
import createMiddleware from 'next-intl/middleware';
import { configApp } from './constants/config';

const publicPages = [PATH.login];
const locales = ['en', 'vi'];
const intlMiddleware = createMiddleware({
    defaultLocale: 'en',
    locales: locales,
    localePrefix: 'always',
});

const authMiddleware = withAuth(
    function onSuccess(req) {
        return intlMiddleware(req as NextRequest);
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                console.log("authorized", token);
                return !!token
            }
        },
        pages: {
            signIn: PATH.login,
        },
        secret: configApp.keyDB,
    }
);

export default async function middleware(request: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})/?$`,
        'i'
    );
    const pathname = request.nextUrl.pathname
    const isPublicPage = publicPathnameRegex.test(pathname);
    console.log("isPublicPage",isPublicPage);
    
    if (isPublicPage) {
        return intlMiddleware(request);
    } else {
        return (authMiddleware as any)(request);
    }
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};