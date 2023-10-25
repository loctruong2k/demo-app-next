'use client';
import { FormLogin } from '@/app/api/auth/type';
import { PATH } from '@/constants/path';
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import './style.sass';
function Login() {
  const router = useRouter()
  const t = useTranslations('auth');
  const schema = yup
    .object({
      username: yup
        .string()
        .trim()
        .min(6, t("error.error_username"))
        .max(16, t("error.error_username"))
        .required(t("error.require_username")),
      password: yup
        .string()
        .trim()
        .min(4, t("error.error_password"))
        .max(16, t("error.error_password"))
        .required(t("error.require_password")),
    })
    .required();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormLogin>({
    resolver: yupResolver<FormLogin>(schema),
    mode: "all",
  });

  const onSubmit = async (form: FormLogin) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...form
    })
    console.log(result);
    
    if (!result?.error) {
      router.replace(PATH.home)
    } else {
    }
  }

  return (
    <main className='login-page'>
      <div className='login-background'>
        <video src='/assets/login/background.mp4' muted autoPlay loop />
      </div>
      <div className='box-form'>
        <div className='form-login'>
          <div className='header-color'></div>
          <div className='header'>
            <Image src='/assets/logo.jpg' className='logo' alt='' width={60} height={60} />
          </div>
          <div className='form'>
            <h3>{t("name")}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='form-group'>
                <label>{t("username")}</label>
                <input className={`${errors.username ? "input-error" : ""}`}  {...register("username")} placeholder={t("username_placeholder")} />
                <span className='error-message'>{errors.username?.message}</span>
              </div>
              <div className='form-group'>
                <label>{t("password")}</label>
                <input className={`${errors.username ? "input-error" : ""}`} {...register("password")} type="password" placeholder={t("password_placeholder")} />
                <span className='error-message'>{errors.password?.message}</span>
              </div>
              <div className='form-group'>
                <button
                  disabled={!isValid}
                  className='button-submit' type="submit">
                  {t("name")}
                </button>
              </div>
            </form>
          </div>
          <div className='footer'>
            <div>{t("forgot_password")}</div>
            <div>{t("no_account")}<span>{t("register")}</span></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login