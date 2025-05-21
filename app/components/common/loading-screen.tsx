import React from 'react'

const LoadingScreen = () => {
  return (
    <div className='flex flex-col gap-3 justify-center items-center'>
      <img src="/images/logo.png" alt="تدبر قرآن" className='w-[440px] h-auto' />
      <p className='text-4xl'>
        درحال بارگذاری ...
      </p>
    </div>
  )
}

export default LoadingScreen