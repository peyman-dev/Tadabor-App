"use client"
import { Input } from 'antd'
import React, { HTMLInputTypeAttribute, ReactNode } from 'react'

const AuthInput = ({ type = "string", label, error, onChange, icon, placeholder, isRequired = false }: { label: string, onChange: React.SetStateAction<any>, icon: ReactNode, isRequired?: boolean, placeholder?: string, type?: HTMLInputTypeAttribute, error?: string | null | undefined }) => {
  return (
    <div>
      <p className='text-xs text-dark'>
        {label} {isRequired ? " * " : ""}
      </p>
      <div dir="ltr">
        <Input autoComplete='off' onChange={(e) => {
          onChange(e.target.value)
        }} prefix={icon} variant='underlined' dir={type == "number" ?'ltr' : "rtl"} type={type} classNames={{
          input: "placeholder:text-sm !mt-2 !text-sm  !font-IRANSans-Regular"
        }} placeholder={placeholder || `${label} رو وارد نمائید`} />
      </div>
      {error &&
        <p className='text-xs text-red-600 mt-2'>
          * {error}
        </p>
      }
    </div>
  )
}

export { AuthInput }