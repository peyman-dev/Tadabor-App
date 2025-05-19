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

export interface HolyResponse {
  data: HolyDataType;
  statuscode: number;
  message: string;
  details: null;
}

export interface HolyDataType {
  informationSentences: InformationSentence[];
  sentence: Sentence;
  audioSentenceDTO: AudioSentenceDTO[];
  audio: Audio;
  translate: null;
}

interface InformationSentence {
  id: number;
  idinformation: number;
  idsentence: number;
  value: string;
  information: Information;
}

interface Information {
  id: number;
  value: string;
}

interface Sentence {
  id: number;
  idseason: number;
  index: number;
  document: string;
  wordByWord: boolean;
  translateDocumnt: string;
  bookIndex: number;
  seasonName: string;
  sentenceFavorite: null;
  sentenceSeen: null;
  sentenceArchive: null;
  words: Word[];
  wordTranslates: null;
  userSentences: null;
  documentSentences: null;
  audios: null;
  sentenceTranslates: SentenceTranslate[];
  informationSentence: null;
}

interface Word {
  id: number;
  idsentence: number;
  index: number;
  value: string;
}

interface SentenceTranslate {
  id: number;
  idseasonTranslate: number;
  idsentence: number;
  document: string;
  wordByWord: boolean;
  index: number;
  wordTranslates: null;
}

interface AudioSentenceDTO {
  id: number;
  idaduio: number;
  idsentence: number;
  startPage: number;
  endPage: number;
  duration: number;
  audioWords: AudioWord[];
}

interface AudioWord {
  id: number;
  idaduioSentence: number;
  idword: number;
  startPage: number;
  endPage: number;
}

interface Audio {
  id: number;
  idbook: number;
  idseason: number;
  idmedia: number;
  totalTime: number;
  audioSentences: null;
}

export interface MediaType {
  id: number;
  idMediaType: number;
  fileName: string;
  unixTimeUpload: number;
  unixTimeLastRecent: number;
  uploadStatus: boolean;
  fileSize: number;
  partSize: number;
  pathMain: string | null;
  duration: number;
}


export interface DailyDataResponseType {
  erroCode: number;
  systemMessage: string;
  message: string | null;
  data: {
    body: string; // این فیلد حاوی یک JSON رشته‌ای شده است که باید جداگانه Parse شود
  };
}