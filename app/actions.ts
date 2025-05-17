// "use server";
import toast from "react-hot-toast";
import { sendRequest } from "./core/api/axios";
import {
  ApiResponseType,
  LoginPayloadType,
  MediaType,
  OTPValidationType,
  RegisterType,
} from "./core/types/types";
// import { cookies } from "next/headers";
// import { cookies as nextCookies } from "next/headers";

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
    console.log(payload);

    // ایجاد یک پرومیس برای تایم اوت
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("درخواست بیش از 10 ثانیه طول کشید"));
      }, 10000); // 10 ثانیه
    });

    // اجرای درخواست و تایم اوت به صورت موازی
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
      timeoutPromise
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

    // ایجاد یک پرومیس برای تایم اوت
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("درخواست بیش از 10 ثانیه طول کشید"));
      }, 10000); // 10 ثانیه
    });

    // اجرای درخواست و تایم اوت به صورت موازی
    const res = await Promise.race([
      sendRequest().post("/Login/LoginPhoneAcept", {}, {
        headers: {
          Phone: payload.Phone,
          Code: payload.Code
        },
        withCredentials: true,
      }),
      timeoutPromise
    ]);

    const data: ApiResponseType = res.data;

    // ذخیره داده‌ها در localStorage
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

export const getDailyData = async () => {
  await createSession();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_BASE_URL}/CallOfTheDay/GetDaily?UserID=92359233958`,
      {
        method: "GET",
      }
    );

    
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export const getMedia = async (mediaId: string) => {
  const res = await sendRequest("FILES").get("/api/v1/Media/Get", {
    headers: {
      IDMedia: mediaId,
    },
  });

  const data = await res.data;
  return data?.data as MediaType;
};

export const mediaStreamUrl = (mediaId: string) => {
  return `${process.env.NEXT_PUBLIC_FILES_BASE_URL}/api/File/DownloadFile?IDMedia=${mediaId}`;
}