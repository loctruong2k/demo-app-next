"use client"
import Footer from '@/src/components/footer'
import Image from 'next/image'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginForm } from '@/src/api/auth/type';
import Link from 'next/link';
import { PATH } from '@/src/constants/path';
import { signInApi } from '@/src/api/auth';
import { useToast } from '@/src/components/toast/hook';
type Props = {}
const schema = yup
    .object({
        username: yup
            .string()
            .trim()
            .lowercase()
            .required("Vui lòng nhập tài khoản.")
            .max(16, "Tài khoản phải đủ 4 ~ 16 ký tự")
            .min(4, "Tài khoản phải đủ 4 ~ 16 ký tự"),

        password: yup
            .string()
            .trim()
            .required("Vui lòng nhập mật khẩu")
            .max(16, "Mật khẩu phải đủ 6 ~ 16 ký tự")
            .min(6, "Mật khẩu phải đủ 6 ~ 16 ký tự"),
    })
    .required();
function LoginPage({ }: Props) {
    const toast = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({
        resolver: yupResolver<any>(schema),
        mode: "all",
    });
    const onsubmit = async (data: LoginForm) => {
        try {
            const res = await signInApi(data)
            if (res) {
                localStorage.setItem("xyz", res.token)
            }
            toast.success({ message: "Đăng nhập thành công!" })
        } catch (error) {
            toast.error({
                message: error + "",
            })
        }
    }    
    return (
        <div className="flex items-center justify-center h-screen w-screen flex-col py-8">
            <div className='flex-1 flex items-center justify-center flex-col'>
                <div>
                    <Image src={"/assets/logo.jpg"} alt='' width={60} height={60} className="rounded-full" />
                </div>
                <h3 className="font-bold text-xl py-2">Đăng nhập</h3>
                <div className=''>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className='flex flex-col py-2'>
                            <label className="font-medium">Tài khoản</label>
                            <input {...register("username")} className="h-10 mt-2 border w-96 pl-2 rounded" placeholder='4 ~ 16 ký tự' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label className="font-medium">Mật khẩu</label>
                            <input {...register("password")} type='password' className="h-10 mt-2 border w-96 pl-2 rounded" placeholder='6 ~ 16 ký tự' />
                        </div>
                        <div className='flex justify-end'>
                            <Link href={PATH.register} className="text-blue-500 hover:underline">Quên mật khẩu?</Link>
                        </div>
                        <div className='w-full flex items-center'>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className='w-full text-center bg-sky-500/75 py-2 mt-2 rounded text-white font-medium hover:bg-sky-600 disabled:cursor-not-allowed'>
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                    <div className='border-[0.2px] border-slate-200 border-dashed my-4' />
                    <div className='text-center'>
                        Bạn chưa có tài khoản? <Link className="text-blue-500 hover:underline" href={PATH.register}>Đăng ký</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LoginPage