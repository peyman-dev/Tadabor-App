import React, { Suspense } from 'react';
import { AuthShapesSVG } from '../assets/svgs/auth-shapes';
import BackButton from '../components/common/buttons/back-button';
import AuthLogo from '../components/pages/auth/Logo';
import SignInLink from '../components/pages/auth/common/sign-in-link';
import AuthLoading from './loading';

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className='!overflow-x-hidden'>
            <BackButton />
            <AuthShapesSVG className='absolute -top-[68px] -right-[68px]' />
            <Suspense fallback={<AuthLoading />}>
                <main className='relative flex-col gap-[43px] min-w-dvw min-h-dvh !overflow-x-hidden flex items-center justify-center'>
                    <AuthLogo />
                    {children} {/* مستقیماً از children استفاده کن */}
                    <SignInLink />
                </main>
            </Suspense>
        </section>
    );
};

export default layout;