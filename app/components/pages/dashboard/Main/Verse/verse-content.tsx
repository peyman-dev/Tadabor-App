import classNames from 'classnames'
import React from 'react'

const VerseContent = () => {


    const activeCn = classNames("!text-[#FBF00A]")
    
    return (
        <section className='size-full !pt-[51px]     *:max-w-[260px] pb-[51px] !mx-auto min-h-[265px] rounded-[13px] bg-gradient-to-t border border-[#4C8BEA]/50 from-[#02BAD4] to-[#A4E3F0] !flex !items-center !justify-center text-center'>
            <div>
                <p>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿١﴾</p>
                <p>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾</p>
                <p>الرَّحْمَنِ الرَّحِيمِ ﴿٣﴾</p>
                <p>مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾</p>
                <p>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾</p>
                <p className={activeCn}>اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾</p>
                <p>صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾</p>
                <p>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿١﴾</p>
                <p>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾</p>
                <p>الرَّحْمَنِ الرَّحِيمِ ﴿٣﴾</p>
                <p>مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾</p>
                <p>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾</p>
                <p>اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾</p>
                <p>صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾</p>
            </div>
        </section>
    )
}

export default VerseContent