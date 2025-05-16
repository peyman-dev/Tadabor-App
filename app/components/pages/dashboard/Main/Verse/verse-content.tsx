"use client"

import { useHolyStore } from '@/app/core/stores/holy.store'
import classNames from 'classnames'
import React from 'react'

const VerseContent = () => {
    const { data } = useHolyStore()
    const sentence = data?.sentence
    const wordsTimelines = data?.audioSentenceDTO

    const RenderSentence = () => {
        function handleActiveWord(e: React.MouseEvent<HTMLSpanElement>) {
            const clickedIndex = parseInt(e.currentTarget.dataset.wordid || '0', 10)
            const allWords = document.querySelectorAll('[data-wordid]')

            console.log(wordsTimelines)
            
            allWords.forEach((wordElement, index) => {
                if (index <= clickedIndex - 1) {
                    wordElement.classList.add(activeCn)
                } else {
                    wordElement.classList.remove(activeCn)
                }
            })
        }


        switch (sentence?.wordByWord) {
            case true: {
                return (
                    <div>

                        {sentence.words.map((word) => (
                            <span
                                key={word.index}
                                data-wordId={word.index}
                                className={`inline-block select-none px-0.5 cursor-pointer ${word.id - 1 == 0 && activeCn}`}
                                onClick={handleActiveWord}
                            >
                                {word.value}
                            </span>
                        ))}
                        <div>
                            <p className='text-xs opacity-80 mt-1'>
                                {sentence.translateDocumnt}
                            </p>
                        </div>
                    </div>
                )
            }
            case false: {
                return <div>not word by word</div>
            }
            default: {
                return null
            }
        }
    }

    const activeCn = classNames("!text-[#FBF00A]")

    return (
        <section className="size-full !pt-[51px] *:max-w-[260px] pb-[51px] !mx-auto min-h-[265px] rounded-[13px] bg-gradient-to-t border border-[#4C8BEA]/50 from-[#02BAD4] to-[#A4E3F0] !flex !items-center !justify-center text-center">
            <div className='space-y-3'>
                <RenderSentence />
            </div>
        </section>
    )
}

export default VerseContent