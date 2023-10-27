"use client"
import { forgotPassword } from '@/src/api/auth';
import { ForgotPasswordForm } from '@/src/api/auth/type';
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
        email: yup.string().trim().required("Vui lòng nhập email").email()
    })
    .required();
const ForgotPassword = () => {
    const toast = useToast()
    const router = useRouter()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordForm>({
        resolver: yupResolver<any>(schema),
        mode: "all",
    });
    const { mutate, isPending } = useMutation({
        mutationKey: [queryKeys.login],
        mutationFn: forgotPassword,
        onError: (error: any) => {
            toast.error({ message: error + "" })
        },
        onSuccess: (data) => {
            reset()
            toast.success({ message: "Đã xác nhận thông tin cấp mật khẩu mới. Vui lòng kiểm tra email để cập nhật thông tin." })
        }
    })
    const onsubmit = async (data: ForgotPasswordForm) => {
        mutate(data)
    }
    return (
        <div className="flex items-center justify-center h-screen w-screen flex-col py-8">
            <div className='flex-1 flex items-center justify-center flex-col'>
                <div>
                    <Image src={"/assets/logo.jpg"} alt='' width={60} height={60} className="rounded-full" />
                </div>
                <h3 className="font-bold text-xl py-2">Quên mật khẩu</h3>
                <div className=''>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className='flex flex-col py-2'>
                            <label className="font-medium">Email</label>
                            <input {...register("email")} type="email" className="h-10 mt-2 border w-96 pl-2 rounded" placeholder='Email đăng ký' />
                        </div>
                        <div className='w-full flex items-center'>
                            <button
                                disabled={isPending}
                                type="submit"
                                className='w-full flex items-center justify-center text-center bg-sky-500/75 py-2 mt-2 rounded text-white font-medium hover:bg-sky-600 disabled:cursor-not-allowed'>
                                <div className={`w-4 h-4 border-t-2 mr-2 border-blue-200 border-solid rounded-full animate-spin ${!isPending && "hidden"}`} />
                                Lấy lại mật khẩu
                            </button>
                        </div>
                    </form>
                    <div className='border-[0.2px] border-slate-200 border-dashed my-4' />
                    <div className='text-center'>
                        Bạn chưa có tài khoản? <Link className="text-blue-500 hover:underline" href={PATH.register}>Đăng ký</Link>
                    </div>
                    <div className='text-center'>
                        Quay lại <Link className="text-blue-400 underline mt-2" href={PATH.login}>Đăng nhập</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default ForgotPassword