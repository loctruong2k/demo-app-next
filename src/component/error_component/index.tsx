import React from 'react'
import "./index.sass"
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PATH } from '@/constants/path';
type Props = {}

function ErrorComponent({ }: Props) {
    const t = useTranslations('error');
    return (
        <div className='error-app'>
            <h2>{t("message")}</h2>
            <Link href={PATH.home}>{t("again")}</Link>
        </div>
    )
}

export default ErrorComponent