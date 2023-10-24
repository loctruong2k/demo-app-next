'use client';
import React from 'react';
import { useRouter } from 'next-intl/client';
import { usePathname } from 'next-intl/client';
import { LanguageType, LanguageList } from './type';

type Props = {
    locale: string
}

function LanguageChanger({ }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const handleChange = (item: LanguageType) => {
        router.push(pathname, { locale: item.code });
    };
    return (
        <div>LanguageChanger</div>
    )
}

export default LanguageChanger