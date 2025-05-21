import React, { AllHTMLAttributes, ReactNode } from 'react'

interface ContainerInterface extends AllHTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <main className='container w-full py-10 shadow-lg rounded-[50px]'>
            <section id="content" className='w-full container md:p-5 *:!w-full flex items-center xl:items-start  justify-center xl:flex-row-reverse flex-col gap-11 mx-auto'>
                {children}
            </section>
        </main>
    )
}

export default Container