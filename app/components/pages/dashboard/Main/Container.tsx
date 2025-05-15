import React, { AllHTMLAttributes, ReactNode } from 'react'

interface ContainerInterface extends AllHTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <main className='container w-full py-10 shadow-lg rounded-[50px]'>
            <section id="content" className='w-full container max-w-md p-5 mx-auto'>
                {children}
            </section>
        </main>
    )
}

export default Container