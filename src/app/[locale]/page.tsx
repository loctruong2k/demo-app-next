'use client';
import { signOut } from "next-auth/react";
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const Home = () => {
  const router = useRouter()
  const t = useTranslations('home');
  
  return (
    <main className={styles.main}>
      {t('title')}
      <button onClick={() => {
        signOut({ redirect: false }).then(() => {
          window.location.reload();
        })
      }}>
        out
      </button>
    </main>
  )
}

export default Home
