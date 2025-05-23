"use client"

import React, { useEffect, useState } from 'react'
import { AuthInput } from '../../components/pages/auth/common/auth-input'
import UserIcon from '@/app/assets/svgs/UserIcon'
import { useForm } from 'react-hook-form'
import PhoneIcon from '@/app/assets/svgs/PhoneIcon'
import PrimaryButton from '@/app/components/common/buttons/primary-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerValidation } from '@/app/core/validations/auth'
import { register } from '@/app/actions'
import toast from 'react-hot-toast'
import { useModal } from '@/app/components/common/modal'
import OTPModal from '@/app/components/pages/auth/otp-modal'

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setValue, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      "phone": "",
      "name": "",
      "family": "",
    },
    resolver: zodResolver(registerValidation)
  })

  const { closeUI, openUI } = useModal()

  useEffect(() => {

  }, [])

  const submitted = async (values: any) => {
    try {
      setIsLoading(true)
      const res = await register(values)
      if (res.erroCode == 206) {
        toast.error(res.message)
      }

      if (res.erroCode == 200) {
        openUI(<OTPModal phone={values.phone} />)
      }

    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitted)} autoComplete='off' className='w-full space-y-[48px] p-4 rounded-[15px] shadow-md shadow-[#303030]/16 pt-[20px] pb-8 bg-white relative max-w-[335px]'>
      <header className='text-center'>
        <p className='text-gray'>
          ایجاد اکانت جدید
        </p>
      </header>
      <main className='space-y-[35.5px]'>
        <AuthInput error={errors.phone?.message} icon={<PhoneIcon />} type='tel' onChange={(value: string) => {
          setValue("phone", value)
        }} isRequired label="شماره همراه" />

        <AuthInput error={errors.name?.message} icon={<UserIcon />} onChange={(value: string) => {
          setValue("name", value)
        }} isRequired label="نام" />

        <AuthInput error={errors.family?.message} icon={<UserIcon />} onChange={(value: string) => {
          setValue("family", value)
        }} isRequired label="نام خانوادگی" />

      </main>
      <footer className="flex items-center justify-center">
        <PrimaryButton loading={isLoading} className='min-w-[242px] h-[50px] rounded-[30px] mx-auto' type='submit'>
          ثبت نام
        </PrimaryButton>
      </footer>
    </form>
  )
}

export default RegisterPage