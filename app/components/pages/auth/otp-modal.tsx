"use client"
import { Input } from 'antd'
import React, { useState } from 'react'
import PrimaryButton from '../../common/buttons/primary-button'
import { verifyOTP } from '@/app/actions'

const OTPModal = ({ phone }: { phone: String }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [OTP, setOTP] = useState<string>("")

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            console.log({
                Code: String(OTP),
                Phone: String(phone)
            })
            const res = await verifyOTP({
                Code: String(OTP),
                Phone: String(phone)
            })
            
            console.log(res)
            
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='my-10 w-full'>
            <div className="flex items-center justify-center flex-col gap-5">
                <div className="text-center">
                    <p className='text-green-500 font-IRANSans-Medium'>
                        کد ورود به شماره {phone} ارسال شد !
                    </p>
                    <p className='text-gray font-IRANSans-Regular mt-2'>
                        لطفا کد ارسال شده به تلفن همراه خود را وارد نمایید
                    </p>
                </div>
                <div dir="ltr" className='max-w-[200px]'>
                    <Input.OTP onChange={(v: string) => {
                        setOTP(v)
                        if (OTP) {
                            handleSubmit()
                        }
                    }} type='number' length={4} />
                </div>
                <PrimaryButton loading={isLoading} onClick={handleSubmit}  className=''>
                    ورود
                </PrimaryButton>
            </div>

        </div>)
}

export default OTPModal