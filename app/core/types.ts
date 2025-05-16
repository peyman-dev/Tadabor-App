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