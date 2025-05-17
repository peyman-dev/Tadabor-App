'use client';

import { useHolyStore } from '@/app/core/stores/holy.store';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';

// Define interfaces for type safety
interface Word {
  index: number;
  value: string;
}

interface AudioWord {
  idword: number;
  startPage: number;
  endPage: number;
}

const VerseContent = () => {
  const { data, setIsPlaying, isPlaying, currentTime, setCurrentTime } = useHolyStore();
  const sentence = data?.sentence;
  const wordsTimelines = data?.audioSentenceDTO?.[0];
  const wordsAudioArray: AudioWord[] | undefined = wordsTimelines?.audioWords;

  // State for tracking the active word index
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);

  // Update active word based on currentTime
  useEffect(() => {
    if (!wordsAudioArray || !isPlaying) return;

    // Convert currentTime (seconds) to milliseconds
    const currentTimeMs = currentTime * 1000;

    // Find the word where currentTimeMs falls within its timeline
    const activeWord = wordsAudioArray.find((word) => {
      return currentTimeMs >= word.startPage && currentTimeMs < word.endPage;
    });

    // Set activeWordIndex based on the found word, or reset to 0 if none found
    setActiveWordIndex(activeWord ? activeWord.idword : 0);
  }, [currentTime, wordsAudioArray, isPlaying]);

  const RenderSentence = () => {
    const handleActiveWord = useCallback(
      (e: React.MouseEvent<HTMLSpanElement>) => {
        const clickedIndex = parseInt(e.currentTarget.dataset.wordid || '0', 10);
        if (!wordsAudioArray) return; 

        const clickedWord = wordsAudioArray.find((word: AudioWord) => word.idword === clickedIndex);
        if (clickedWord) {
          // Convert startPage (ms) to seconds for setCurrentTime
          setCurrentTime(clickedWord.startPage / 1000);
          setActiveWordIndex(clickedIndex); // Update active word
          if (!isPlaying) setIsPlaying(true); // Start playing if not already
        }
      },
      [wordsAudioArray, isPlaying, setCurrentTime, setIsPlaying]
    );

    switch (sentence?.wordByWord) {
      case true: {
        return (
          <div>
            {sentence.words.map((word: Word) => (
              <span
                key={word.index}
                data-wordid={word.index}
                className={classNames(
                  'inline-block select-none px-0.5 cursor-pointer',
                  {
                    '!text-[#FBF00A]': activeWordIndex >= word.index && activeWordIndex !== 0,
                    'text-gray-600': activeWordIndex < word.index || activeWordIndex === 0,
                  }
                )}
                onClick={handleActiveWord}
              >
                {word.value}
              </span>
            ))}
            <div>
              <p className="text-xs opacity-80 mt-1">{sentence.translateDocumnt}</p>
            </div>
          </div>
        );
      }
      case false: {
        return <div>not word by word</div>;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <section className="size-full !pt-[51px] *:max-w-[260px] pb-[51px] !mx-auto min-h-[265px] rounded-[13px] bg-gradient-to-t border border-[#4C8BEA]/50 from-[#02BAD4] to-[#A4E3F0] !flex !items-center !justify-center text-center">
      <div className="space-y-3">
        <RenderSentence />
      </div>
    </section>
  );
};

export default VerseContent;