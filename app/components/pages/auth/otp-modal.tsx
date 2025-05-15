"use client"
import { Input } from 'antd'
import React from 'react'
import PrimaryButton from '../../common/buttons/primary-button'

const OTPModal = () => {

    return (
        <div className='my-10 w-full'>
            <div className="flex items-center justify-center flex-col gap-5">
                <div className="text-center">
                    <p className='text-green-500 font-IRANSans-Medium'>
                        کد ورود با موفقیت ارسال شد !
                    </p>
                    <p className='text-gray font-IRANSans-Regular mt-2'>
                        لطفا کد ارسال شده به تلفن همراه خود را وارد نمایید
                    </p>
                </div>
                <div dir="ltr" className='max-w-[250px]'>
                    <Input.OTP type='number' length={5} />
                </div>
                <PrimaryButton className=''>
                    ورود
                </PrimaryButton>
            </div>

        </div>)
}

export default OTPModal