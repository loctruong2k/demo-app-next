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
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { queryKeys } from '@/src/constants/query-key';
import { queryClient } from '@/src/components/check-login';
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
const LoginPage = () => {
    const toast = useToast()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginForm>({
        resolver: yupResolver<any>(schema),
        mode: "all",
    });
    const { mutate, isPending } = useMutation({
        mutationKey: [queryKeys.login],
        mutationFn: signInApi,
        onError: (error: any) => {
            toast.error({ message: error + "" })
        },
        onSuccess: async (data) => {
            if (!data) {
                toast.error({ message: "Không thể đăng nhập lúc này." })
                return
            }
            localStorage.setItem("xyz", data?.token)
            queryClient.setQueryData([queryKeys.token], data.token)
            toast.success({ message: "Đăng nhập thành công!" })
            router.replace(PATH.home)
        }
    })
    const onsubmit = async (data: LoginForm) => {
        mutate(data)
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
                            <Link href={PATH.forgotPassword} className="text-blue-500 hover:underline">Quên mật khẩu?</Link>
                        </div>
                        <div className='w-full flex items-center'>
                            <button
                                disabled={isPending}
                                type="submit"
                                className='w-full flex items-center justify-center text-center bg-sky-500/75 py-2 mt-2 rounded text-white font-medium hover:bg-sky-600 disabled:cursor-not-allowed'>
                                <div className={`w-4 h-4 border-t-2 mr-2 border-blue-200 border-solid rounded-full animate-spin ${!isPending && "hidden"}`} />
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