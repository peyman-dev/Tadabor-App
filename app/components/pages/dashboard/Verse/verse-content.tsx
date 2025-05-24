'use client'

import { useHolyStore } from '@/app/core/stores/holy.store'
import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

const VerseContent = () => {
  const { data,setIsAudioPlaying, isAudioPlaying, currentTime, seekToTime, isAudioLoaded } = useHolyStore()
  const sentence = data?.sentence
  const wordsTimelines = data?.audioSentenceDTO?.[0]
  const wordsAudioArray = wordsTimelines?.audioWords
  const [activeWordIndex, setActiveWordIndex] = useState(0)

  useEffect(() => {
    if (!wordsAudioArray || !isAudioPlaying) {
      setActiveWordIndex(0)
      return
    }

    const currentTimeMs = currentTime * 1000
    const activeWord = wordsAudioArray.find((word: any) => {
      return currentTimeMs >= word.startPage && currentTimeMs < word.endPage
    })

    if (activeWord && activeWord.idword !== activeWordIndex) {
      setActiveWordIndex(activeWord.idword)
    } else if (!activeWord && activeWordIndex !== 0) {
      setActiveWordIndex(0)
    }
  }, [currentTime, wordsAudioArray, isAudioPlaying, activeWordIndex])

  const RenderSentence = () => {
    const handleActiveWord = useCallback(
      (e: any) => {
        if (!wordsAudioArray || !isAudioLoaded) {
          return
        }

        const clickedIndex = parseInt(e.currentTarget.dataset.wordid || '0', 10)
        const clickedWord = wordsAudioArray.find((word: any) => word.idword === clickedIndex)

        if (clickedWord) {
          const newTime = clickedWord.startPage / 1000
          seekToTime(newTime)
          setActiveWordIndex(clickedIndex)
          if (!isAudioPlaying) {
            setIsAudioPlaying(true)
          }
        }
      },
      [wordsAudioArray, isAudioPlaying, seekToTime, setIsAudioPlaying, isAudioLoaded]
    )

    switch (sentence?.wordByWord) {
      case true:
        return (
          <div>
            {sentence.words.map((word: any) => (
              <span
                key={word.index}
                data-wordid={word.index}
                className={classNames('inline-block select-none px-0.5 cursor-pointer', {
                  '!text-[#FBF00A]': activeWordIndex === word.index,
                  'text-gray-600': activeWordIndex !== word.index,
                })}
                onClick={handleActiveWord}
              >
                {word.value}
              </span>
            ))}
            <div>
              <p className="text-xs opacity-80 mt-1">{sentence.translateDocumnt}</p>
            </div>
          </div>
        )
      case false:
        return (
          <div>
            <p>{sentence?.document}</p>
            <p className="text-xs opacity-80 mt-1">{sentence.translateDocumnt}</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <section className="size-full !pt-[51px] *:max-w-[260px] pb-[51px] !mx-auto min-h-[265px] rounded-[13px] bg-gradient-to-t border border-[#4C8BEA]/50 from-[#02BAD4] to-[#A4E3F0] !flex !items-center !justify-center text-center">
      <div className="space-y-3">
        <RenderSentence />
      </div>
    </section>
  )
}

export default VerseContent