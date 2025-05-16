export type LoginPayloadType = {
  Phone: number | string;
  // password: string
};

export type RegisterType = {
  phone: string;
  name: string;
  family: string
};

export type ApiResponseType = {
  erroCode: number;
  systemMessage: string;
  message: string;
  data: {
    id: number;
    idPerson: number;
    username: string | null;
    password: string;
    unixTimeLastSeen: number | null;
    status: boolean;
    code: number;
    actor: string | null;
  };
};

export type OTPValidationType = {
  Phone: string,
  Code: string
}

export type LoginMethodType = "OTP" | "PASSWORD"



export interface HolyObjectType {
  value?: string;
  isInformation?: boolean;
  id?: number;
  document?: string;
  wordByWord?: boolean;
  trans?: string;
  bookIndex?: number;
  seasonName?: string;
  sentenceSeen?: null;
  sentenceArchive?: null;
  word?: any[];
  index?: number;
  idsentence?: number;
  idsentenceTranslates?: number;
  wordTranslates?: null;
  userSentences?: null;
  documentSentences?: any[];
  information_sentences?: InformationSentence[];
  sentence?: Sentence;
  audioSentenceDTO?: AudioSentenceDTO[];
  audio?: Audio[];
  translate?: null;
  endPage?: number;
  quranVerse?: QuranVerse; // اضافه کردن آیه قرآن
}

interface InformationSentence {
  id: number;
  idsentence: number;
  value: string;
  information: Information;
  idInformation?: number;
}

interface Information {
  id?: number;
  value?: string;
}

interface Sentence {
  id: number;
  idseason: number;
  index: number;
  document: string;
  wordByWord: boolean;
  trans: string;
  bookIndex: number;
  seasonName: string;
  sentenceFavorite?: null;
  sentenceSeen?: null;
  sentenceArchive?: null;
  words?: Word[];
  value: string;
  wordTranslates?: null;
  userSentences?: null;
  documentSentences?: null;
  sentenceTranslates?: any[];
}

interface Word {
  id: number;
  idsentence: number;
  index: number;
  value: string;
}

interface AudioSentenceDTO {
  id: number;
  idAudioSentence?: number;
  idSeason?: number;
  startPage?: number;
  endPage?: number;
  duration?: number;
  audioWords?: any[];
  idWord?: number;
}

interface Audio {
  id: number;
  idBook: number;
  idSeason: number;
  idmedia: number;
  totalTime: number;
  audioSentences?: null;
}

interface QuranVerse {
  id: number;
  surah: number;
  verseNumber: number;
  text: string;
  translation: string;
  transliteration: string;
  audioUrl: string;
  tafsir: string;
}