import React, { ReactNode } from 'react'
import { AuthShapesSVG } from '../components/svgs/auth-shapes'
import BackButton from '../components/common/buttons/back-button'
import AuthLogo from '../components/pages/auth/Logo'
import SignInLink from '../components/pages/auth/common/sign-in-link'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <section className='!overflow-x-hidden'>
            <BackButton />
            <AuthShapesSVG className='absolute -top-[68px] -right-[68px]' />
            <main className='relative flex-col gap-[43px] min-w-dvw min-h-dvh !overflow-x-hidden flex items-center justify-center'>
                <AuthLogo />
                {children}
                <SignInLink />
            </main>
        </section>
    )
}

export default layout