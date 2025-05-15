"use client"

import React from 'react'
import { AuthInput } from '../../components/pages/auth/common/auth-input'
import UserIcon from '@/app/components/svgs/UserIcon'
import { useForm } from 'react-hook-form'
import PhoneIcon from '@/app/components/svgs/PhoneIcon'
import PasswordIcon from '@/app/components/svgs/PasswordIcon'
import PrimaryButton from '@/app/components/common/buttons/primary-button'

const RegisterPage = () => {
  const { setValue } = useForm({
    defaultValues: {
      username: "",
      phoneNumber: null,
      password: null,

    }
  })


  return (
    <form autoComplete='off' className='w-full space-y-[48px] p-4 rounded-[15px] shadow-md shadow-[#303030]/16 pt-[20px] pb-8 bg-white relative max-w-[335px]'>
      <header className='text-center'>
        <p className='text-gray'>
          ایجاد اکانت جدید
        </p>
      </header>
      <main className='space-y-[35.5px]'>

        <AuthInput icon={<UserIcon />} onChange={(value: string) => {
          setValue("username", value)
        }} isRequired label="نام کاربری" />

        <AuthInput icon={<PhoneIcon />} type='number' onChange={(value: any) => {
          setValue("phoneNumber", value)
        }} isRequired label="شماره همراه" />

        <AuthInput icon={<PasswordIcon />} type='password' onChange={(value: any) => {
          setValue("password", value)
        }} isRequired label="گذرواژه" />

      </main>
      <footer className="flex items-center justify-center">
        <PrimaryButton className='min-w-[242px] h-[50px] rounded-[30px] mx-auto'>
          ثبت نام
        </PrimaryButton>
      </footer>
    </form>
  )
}

export default RegisterPage