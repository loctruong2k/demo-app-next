"use client"
import { registerApi } from '@/src/api/auth';
import { RegisterForm } from '@/src/api/auth/type';
import Footer from '@/src/components/footer';
import { useToast } from '@/src/components/toast/hook';
import { PATH } from '@/src/constants/path';
import { queryKeys } from '@/src/constants/query-key';
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
        email: yup.string().trim().required("Vui lòng nhập email").email()
    })
    .required();
const RegisterPage = () => {
    const toast = useToast()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterForm>({
        resolver: yupResolver<any>(schema),
        mode: "all",
    });
    const { mutate, isPending } = useMutation({
        mutationKey: [queryKeys.register],
        mutationFn: registerApi,
        onError: (error: any) => {
            toast.error({ message: error + "" })
        },
        onSuccess: (data) => {
            if (!data) {
                toast.error({ message: "Không thể tạo tài khoản lúc này." })
                return
            }
            toast.success({ message: "Tạo tài khoản thành công. Vui lòng xác nhận email đăng ký để kích hoạt tài khoản." })
            router.replace(PATH.login)
        }
    })
    const onsubmit = async (data: RegisterForm) => {
        mutate(data)
    }
    return (
        <div className="flex items-center justify-center h-screen w-screen flex-col py-8">
            <div className='flex-1 flex items-center justify-center flex-col'>
                <div>
                    <Image src={"/assets/logo.jpg"} alt='' width={60} height={60} className="rounded-full" />
                </div>
                <h3 className="font-bold text-xl py-2">Đăng ký</h3>
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
                        <div className='flex flex-col py-2'>
                            <label className="font-medium">Email</label>
                            <input {...register("email")} type="email" className="h-10 mt-2 border w-96 pl-2 rounded" placeholder='Email đăng ký' />
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
                                Đăng ký
                            </button>
                        </div>
                    </form>
                    <div className='border-[0.2px] border-slate-200 border-dashed my-4' />
                    <div className='text-center'>
                        Bạn đã có tài khoản? <Link className="text-blue-500 hover:underline" href={PATH.login}>Đăng nhập</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RegisterPage