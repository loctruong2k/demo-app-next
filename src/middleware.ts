import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
    defaultLocale: 'en',
    locales: ['en', 'vi'],
    localePrefix: 'always',
    localeDetection:true
});

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};