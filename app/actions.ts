// "use server";
import toast from "react-hot-toast";
import { sendRequest } from "./core/api/axios";
import {
  ApiResponseType,
  DailyDataResponseType,
  LoginPayloadType,
  MediaType,
  OTPValidationType,
  RegisterType,
} from "./core/types/types";

export const createSession = async (): Promise<ApiResponseType> => {
  console.log("Sending GET request to /Login/CreateSession", {
    method: "GET",
    endpoint: "/Login/CreateSession",
    headers: {},
    body: null,
  });

  const res = await sendRequest().get("/Login/CreateSession");
  const data = await res.data;


  return data;
};

export const login = async (
  payload: LoginPayloadType
): Promise<ApiResponseType> => {
  console.log("Sending POST request to /Login/LoginPhone", {
    method: "POST",
    endpoint: "/Login/LoginPhone",
    headers: { Phone: payload.Phone.toString() },
    body: null,
  });

  const res = await sendRequest().post("/Login/LoginPhone", null, {
    headers: {
      Phone: payload.Phone.toString(),
    },
  });
  const data = await res.data;
  return data;
};

export const sendOTP = async (Phone: string) => {
  try {
    console.log("Sending POST request to /Login/LoginPhone", {
      method: "POST",
      endpoint: "/Login/LoginPhone",
      headers: { Phone },
      body: null,
    });

    const res = await sendRequest().post("/Login/LoginPhone", null, {
      headers: {
        Phone,
      },
    });
    const data = await res.data;
    toast.success(data?.message);
    return data;
  } catch (error: any) {
    toast.error(error?.message);
    return error;
  }
};

export const register = async (
  payload: RegisterType
): Promise<ApiResponseType> => {
  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("درخواست بیش از 10 ثانیه طول کشید"));
      }, 10000);
    });

    console.log("Sending POST request to /Login/Register", {
      method: "POST",
      endpoint: "/Login/Register",
      headers: { "Content-Type": "application/json" },
      body: {
        phone: "0" + payload.phone,
        name: payload.name,
        family: payload.family,
      },
    });

    const res = await Promise.race([
      sendRequest().post(
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
      ),
      timeoutPromise,
    ]);

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
  try {
    await createSession();

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("درخواست بیش از 10 ثانیه طول کشید"));
      }, 10000);
    });

    console.log("Sending POST request to /Login/LoginPhoneAcept", {
      method: "POST",
      endpoint: "/Login/LoginPhoneAcept",
      headers: { Phone: payload.Phone, Code: payload.Code },
      body: {},
      withCredentials: true,
    });

    const res = await Promise.race([
      sendRequest().post(
        "/Login/LoginPhoneAcept",
        {},
        {
          headers: {
            Phone: payload.Phone,
            Code: payload.Code,
          },
          withCredentials: true,
        }
      ),
      timeoutPromise,
    ]);

    const data: ApiResponseType = res.data;

    if (data.erroCode == 200) {
      localStorage.setItem("userData", JSON.stringify(data.data));
    } else {
      toast.error(data.message);
    }

    return data;
  } catch (error: any) {
    console.error("ERROR:", error);
    toast.error(error?.message || "مشکلی پیش آمده است");
    throw error;
  }
};

export const getDailyData = async (): Promise<DailyDataResponseType> => {
  await createSession();

  try {
    // دریافت آدرس IP کاربر (مثال: از یک API یا متغیر محیطی)
    const userIP = await fetchUserIP(); // این تابع باید پیاده‌سازی شود

    console.log("Sending GET request to /CallOfTheDay/GetDaily", {
      method: "GET",
      endpoint: `${process.env.NEXT_PUBLIC_USER_BASE_URL}/CallOfTheDay/GetDaily?UserID=${userIP}`,
      headers: {},
      body: null,
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_BASE_URL}/CallOfTheDay/GetDaily?UserID=${userIP}`,
      {
        method: "GET",
      }
    );
    
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error: any) {
    return error;
  }
};

const fetchUserIP = async (): Promise<string> => {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching user IP:", error);
    return "unknown";
  }
};

export const getMedia = async (mediaId: string) => {
  console.log("Sending GET request to /api/v1/Media/Get", {
    method: "GET",
    endpoint: "/api/v1/Media/Get",
    headers: { IDMedia: mediaId },
    body: null,
    apiType: "FILES",
  });

  const res = await sendRequest("FILES").get("/api/v1/Media/Get", {
    headers: {
      IDMedia: mediaId,
    },
  });

  const data = await res.data;
  return data?.data as MediaType;
};

export const generateMediaSrc = (mediaId: string) => {
  console.log("Generating media download URL", {
    endpoint: `${process.env.NEXT_PUBLIC_FILES_BASE_URL}/Files/DownloadFile?IDMedia=${mediaId}`,
    apiType: "FILES",
  });

  return `${process.env.NEXT_PUBLIC_FILES_BASE_URL}/api/File/DownloadFile?${mediaId}`;
};
