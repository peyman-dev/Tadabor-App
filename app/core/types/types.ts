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



// تعریف تایپ‌های فرعی برای بخش‌های مختلف
interface Information {
  id: number;
  sentence: number;
  value: string;
}

interface Word {
  id: number;
  sentence: number;
  index: number;
  value: string;
}

interface SentenceTranslate {
  id: number;
  sentence: number;
  document: string;
  word: boolean;
  index: number;
}

interface Sentence {
  id: number;
  index: number;
  document: string;
  word: boolean;
  translateDocument: boolean;
  bookIndex: number;
  sentenceIndex: number | null;
  sentenceArchive: null;
  words: Word[];
  wordTranslates: null;
  userSentences: null;
  documentSentences: null;
  sentenceTranslates: SentenceTranslate[];
}

interface Audio {
  id: number;
  idbook: number;
  idseason: number;
  idmedia: number;
  totalTime: number;
  audioSentences: null;
}

interface Translate {
  language: string;
  value: string;
}

// تعریف تایپ اصلی برای InformationSentences
export interface HolyType {
  id: number;
  Information?: Information; // optional چون همه‌ی آیتم‌ها این فیلد رو ندارن
  sentence?: Sentence; // optional
  audio?: Audio; // optional
  translate?: Translate[]; // optional
}