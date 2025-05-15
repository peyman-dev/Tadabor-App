"use client"
import classNames from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'

interface BorderedButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const BorderedButton: React.FC<BorderedButtonType> = ({ children, onClick, ...rest }) => {
    return (
        <div className={classNames('md:h-14.5 md:w-14.5 size-[45px] rounded-[16px] !p-1.5 text-[#412B6C] !text-xs cursor-pointer bg-gradient-to-t from-[#02BAD4] to-[#A4E3F0]', rest.className)}>
            <button onClick={onClick} {...rest} className='bg-white/50 flex items-center justify-center size-full rounded-[calc(0.8rem-1px)] cursor-pointer'>
                {children}
            </button>
        </div>
    )
}

export default BorderedButton