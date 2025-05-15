"use client"

import { login } from '@/app/actions'
import PrimaryButton from '@/app/components/common/buttons/primary-button'
import { AuthInput } from '@/app/components/pages/auth/common/auth-input'
import PasswordIcon from '@/app/components/svgs/PasswordIcon'
import PhoneIcon from '@/app/components/svgs/PhoneIcon'
import { LoginPayloadType } from '@/app/core/types'
// import UserIcon from '@/app/components/svgs/UserIcon'
import { loginValidation } from '@/app/core/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface AuthValuesType {
    phoneNumber: number | null
    password: string
}

const LoginPage = () => {
    const { setValue, formState: { errors }, watch, handleSubmit, register } = useForm({
        defaultValues: {
            phoneNumber: "",
            password: ""
        },
        resolver: zodResolver(loginValidation)
    })

    const [isLoading, setIsLoading] = useState(false)

    const submitted = async (values: AuthValuesType) => {

        try {
            setIsLoading(true)
            const payload: LoginPayloadType = {
                Phone: String(values.phoneNumber),
            }
            
            const res = await login(payload)
            console.log(res)
            toast.error(res.message)
        } catch (error) {
            console.log(error)   
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <form onSubmit={handleSubmit(submitted)} autoComplete='off' className='w-full space-y-[48px] p-4 rounded-[15px] shadow-md shadow-[#303030]/16 pt-[20px] pb-8 bg-white relative max-w-[335px]'>
            <header className='text-center'>
                <p className='text-gray'>
                    وارد اکانت خود شوید
                </p>
            </header>
            <main className='space-y-[35.5px]'>

                <AuthInput error={errors.phoneNumber?.message} icon={<PhoneIcon />} type='number' onChange={(value: any) => {
                    setValue("phoneNumber", value)
                }} isRequired label="شماره همراه" />

                <AuthInput error={errors.password?.message} icon={<PasswordIcon />} type='password' onChange={(value: any) => {
                    setValue("password", value)
                }} isRequired label="گذرواژه" />

            </main>
            <footer className="flex items-center justify-center">
                <PrimaryButton loading={isLoading} type="submit" className='min-w-[242px] h-[50px] rounded-[30px] mx-auto'>
                    وارد شوید
                </PrimaryButton>
            </footer>
        </form>
    )
}

export default LoginPage