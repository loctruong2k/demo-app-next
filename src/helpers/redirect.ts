import { redirect } from 'next/navigation'
export const redirectPage = (path: string) => {
    redirect(path)
}