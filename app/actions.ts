import toast from "react-hot-toast";
import { sendRequest } from "./core/api/axios";
import {
  ApiResponseType,
  LoginPayloadType,
  OTPValidationType,
  RegisterType,
} from "./core/types";

export const createSession = async (): Promise<ApiResponseType> => {
  const res = await sendRequest().get("/Login/CreateSession");
  const data = await res.data;
  return data;
};

export const login = async (
  payload: LoginPayloadType
): Promise<ApiResponseType> => {
  const res = await sendRequest().post("/Login/LoginPhone", null, {
    headers: {
      Phone: payload.Phone.toString(),
    },
  });
  const data = await res.data;
  return data;
};

export const sendOTP = async (Phone: string) => {
  console.log(Phone);
  try {
    const res = await sendRequest().post("/Login/LoginPhone", null, {
      headers: {
        Phone,
      },
    });
    const data = await res.data;
    toast.success(data?.message);
    return data;
  } catch (error: any) {
    console.log(error);
    toast.error(error?.message);
    return error;
  }
};

export const register = async (
  payload: RegisterType
): Promise<ApiResponseType> => {
  try {
    const res = await sendRequest().post(
      "/Login/Register",
      JSON.stringify({
        phone: "0" + payload.phone,
        name: payload.name,
        family: payload.family,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.data;
    return data;
  } catch (error: any) {
    toast.error(error?.message);
    return error;
  }
};

export const verifyOTP = async (
  payload: OTPValidationType
): Promise<ApiResponseType> => {
  console.log(0 + payload.Phone);
  try {
    const res = await sendRequest().post("/Login/LoginPhoneAcept", {
      headers: {
        Phone: payload.Phone,
        Code: payload.Code,
      },
    });

    const data = await res.data;

    return data;
  } catch (error: any) {
    toast.error(error?.message);
    return error;
  }
};

export const getDailyData = async () => {
  const cookieKey = crypto.randomUUID();
  
  
};
