"use client"

import { login, sendOTP } from '@/app/actions'
import PrimaryButton from '@/app/components/common/buttons/primary-button'
import { useModal } from '@/app/components/common/modal'
import { AuthInput } from '@/app/components/pages/auth/common/auth-input'
import OTPModal from '@/app/components/pages/auth/otp-modal'
import PasswordIcon from '@/app/assets/svgs/PasswordIcon'
import PhoneIcon from '@/app/assets/svgs/PhoneIcon'
import { LoginPayloadType } from '@/app/core/types/types'
// import UserIcon from '@/app/components/svgs/UserIcon'
import { loginValidation } from '@/app/core/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { generateCacheForUserResponse } from '@/app/core/utils'

interface AuthValuesType {
    phoneNumber: number | null
    password: string
}

type LoginMethodType = "PASSWORD" | "OTP"

const LoginPage = () => {
    const [loginMethod, setLoginMethod] = useState<LoginMethodType>("PASSWORD")
    const { setValue, formState: { errors }, watch, handleSubmit, register } = useForm({
        defaultValues: {
            phoneNumber: "",
            password: ""
        },
        resolver: zodResolver(loginValidation(loginMethod))
    })


    const [isLoading, setIsLoading] = useState(false)

    const { openUI, closeUI } = useModal()

    const submitted = async (values: any) => {
        if (loginMethod === "PASSWORD") {
            try {
                setIsLoading(true)
                const payload: LoginPayloadType = {
                    Phone: String(values.phoneNumber),
                }

                const res = await login(payload)

                if (res.erroCode == 200) {
                    toast.success(res.message)
                    // Cache the user data in localStorage
                    generateCacheForUserResponse(res)
                } else {
                    toast.error("عملیات با خطا مواجه شد ")
                }
            } catch (error) {
                toast.error("عملیات با خطا مواجه شد ")

            } finally {
                setIsLoading(false)
            }
        } else {
            try {
                setIsLoading(true)
                const res = await sendOTP(String("0" + values.phoneNumber))
                if (res.erroCode == 200) {
                    openUI(<OTPModal phone={String("0" + values.phoneNumber)} />)
                } else {
                    toast.error("عملیات با خطا مواجه شد ")
                }

            } catch (error: any) {
                toast.error("عملیات با خطا مواجه شد ")
            } finally {
                setIsLoading(false)
            }
        }

    }

    const handleTabSwitch = () => {
        if (loginMethod === "PASSWORD") setLoginMethod("OTP"); else setLoginMethod("PASSWORD")
    }

    return (
        <form onSubmit={handleSubmit(submitted)} autoComplete='off' className='w-full space-y-[48px] p-4 rounded-[15px] shadow-md shadow-[#303030]/16 pt-[20px] pb-8 bg-white relative max-w-[335px]'>
            <header className='text-center'>
                <p className='text-gray'>
                    وارد اکانت خود شوید
                </p>
            </header>
            <main className='space-y-[35.5px]'>

                <AuthInput error={errors.phoneNumber?.message} icon={<PhoneIcon />} type='number' onChange={(value: never) => {
                    setValue("phoneNumber", value)
                }} isRequired label="شماره همراه" />
                {loginMethod == "PASSWORD" ?
                    <AuthInput error={errors.password?.message} icon={<PasswordIcon />} type='password' onChange={(value: never) => {
                        setValue("password", value)
                    }} isRequired label="گذرواژه" />
                    : null
                }

                <div className='flex justify-center text-xs  text-primary items-center gap-1'>
                    <button className='cursor-pointer' type='button' onClick={handleTabSwitch}>
                        {loginMethod === "PASSWORD" ?
                            "ورود با کد یک بار مصرف" : "ورود با گذرواژه"
                        }
                    </button>

                </div>
            </main>
            <footer className="flex items-center justify-center">
                <PrimaryButton loading={isLoading} type="submit" className='min-w-[242px] h-[50px] rounded-[30px] mx-auto text-sm'>
                    {loginMethod === "PASSWORD" ? "وارد شوید" : "ارسال کد تائید"
                    }
                </PrimaryButton>
            </footer>
        </form>
    )
}

export default LoginPage