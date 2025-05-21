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
import { v4 as uniqueID } from "uuid";

// Function to create a session by sending a GET request to /Login/CreateSession
export const createSession = async (): Promise<ApiResponseType> => {
  // Log the initiation of a GET request to /Login/CreateSession with details about the request
  console.log(
    "%cSending GET request to /Login/CreateSession",
    "color: red; background: black",
    {
      method: "GET",
      endpoint: "/Login/CreateSession",
      headers: {},
      body: null,
    }
  );

  const res = await sendRequest().get("/Login/CreateSession");
  const data = await res.data;

  // Log the response received from the /Login/CreateSession endpoint
  console.log(
    "%cResponse from /Login/CreateSession",
    "color: green; background: black",
    data
  );
  return data;
};

// Function to log in a user by sending a POST request to /Login/LoginPhone
export const login = async (
  payload: LoginPayloadType
): Promise<ApiResponseType> => {
  // Log the initiation of a POST request to /Login/LoginPhone, including the phone number in headers
  console.log(
    "%cSending POST request to /Login/LoginPhone",
    "color: red; background: black",
    {
      method: "POST",
      endpoint: "/Login/LoginPhone",
      headers: { Phone: payload.Phone.toString() },
      body: null,
    }
  );

  const res = await sendRequest().post("/Login/LoginPhone", null, {
    headers: {
      Phone: payload.Phone.toString(),
    },
  });
  const data = await res.data;

  // Log the response received from the /Login/LoginPhone endpoint
  console.log(
    "%cResponse from /Login/LoginPhone",
    "color: green; background: black",
    data
  );
  return data;
};

// Function to send an OTP by making a POST request to /Login/LoginPhone
export const sendOTP = async (Phone: string) => {
  try {
    // Log the initiation of a POST request to /Login/LoginPhone for OTP sending
    console.log(
      "%cSending POST request to /Login/LoginPhone",
      "color: red; background: black",
      {
        method: "POST",
        endpoint: "/Login/LoginPhone",
        headers: { Phone },
        body: null,
      }
    );

    const res = await sendRequest().post("/Login/LoginPhone", null, {
      headers: {
        Phone,
      },
    });
    const data = await res.data;

    // Log the response received from the /Login/LoginPhone endpoint after OTP request
    console.log(
      "%cResponse from /Login/LoginPhone",
      "color: green; background: black",
      data
    );
    toast.success(data?.message);
    return data;
  } catch (error: any) {
    // Log any error that occurs during the OTP sending process
    console.error(
      "%cERROR in sendOTP:",
      "color: red; background: black",
      error
    );
    toast.error(error?.message);
    return error;
  }
};

// Function to register a new user by sending a POST request to /Login/Register
export const register = async (
  payload: RegisterType
): Promise<ApiResponseType> => {
  try {
    // Create a promise to handle request timeout after 10 seconds
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("درخواست بیش از 10 ثانیه طول کشید"));
      }, 10000);
    });

    // Log the initiation of a POST request to /Login/Register with user details
    console.log(
      "%cSending POST request to /Login/Register",
      "color: red; background: black",
      {
        method: "POST",
        endpoint: "/Login/Register",
        headers: { "Content-Type": "application/json" },
        body: {
          phone: "0" + payload.phone,
          name: payload.name,
          family: payload.family,
        },
      }
    );

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
    // Log the response received from the /Login/Register endpoint
    console.log(
      "%cResponse from /Login/Register",
      "color: green; background: black",
      data
    );
    return data;
  } catch (error: any) {
    // Log any error that occurs during the registration process
    console.error(
      "%cERROR in register:",
      "color: red; background: black",
      error
    );
    toast.error(error?.message);
    return error;
  }
};

// Function to verify OTP by sending a POST request to /Login/LoginPhoneAcept
export const verifyOTP = async (
  payload: OTPValidationType
): Promise<ApiResponseType> => {
  try {
    await createSession();

    // Create a promise to handle request timeout after 10 seconds
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error("درخواست بیش از 10 ثانیه طول کشید"));
      }, 10000);
    });

    // Log the initiation of a POST request to /Login/LoginPhoneAcept with phone and OTP code
    console.log(
      "%cSending POST request to /Login/LoginPhoneAcept",
      "color: red; background: black",
      {
        method: "POST",
        endpoint: "/Login/LoginPhoneAcept",
        headers: { Phone: payload.Phone, Code: payload.Code },
        body: {},
        withCredentials: true,
      }
    );

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
    // Log the response received from the /Login/LoginPhoneAcept endpoint
    console.log(
      "%cResponse from /Login/LoginPhoneAcept",
      "color: green; background: black",
      data
    );

    if (data.erroCode == 200) {
      localStorage.setItem("userData", JSON.stringify(data.data));
    } else {
      toast.error(data.message);
    }

    return data;
  } catch (error: any) {
    // Log any error that occurs during OTP verification
    console.error(
      "%cERROR in verifyOTP:",
      "color: red; background: black",
      error
    );
    toast.error(error?.message || "مشکلی پیش آمده است");
    throw error;
  }
};

// Function to generate a unique user ID based on timestamp and random number
export const generateUniqueID = (): number => {
  if (typeof window !== "undefined") {
    const storedID = localStorage.getItem("userID");
    if (storedID) {
      return parseInt(storedID, 10);
    }
  }

  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  const newID = (timestamp * 1000000 + random) % 9007199254740991;

  if (typeof window !== "undefined") {
    localStorage.setItem("userID", newID.toString());
  }

  // Log the newly generated unique ID
  console.log(
    "%cGenerated unique ID",
    "color: green; background: black",
    newID
  );
  return newID;
};

// Function to generate a hashed ID based on the user's IP address
const generateHashedID = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return String(data.ip).replaceAll(".", "");
  } catch (error) {
    // Log any error that occurs while fetching the IP address
    console.error("Error fetching IP address:", error);
  }
};

// Function to fetch daily data by sending a GET request to /CallOfTheDay/GetDaily
export const getDailyData = async (): Promise<DailyDataResponseType> => {
  await createSession();

  try {
    const userID = await generateHashedID();

    // Log the initiation of a GET request to /CallOfTheDay/GetDaily with user ID
    console.log(
      "%cSending GET request to /CallOfTheDay/GetDaily",
      "color: red; background: black",
      {
        method: "GET",
        endpoint: `${process.env.NEXT_PUBLIC_USER_BASE_URL}/CallOfTheDay/GetDaily?UserID=${userID}`,
        headers: {},
        body: null,
      }
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_USER_BASE_URL}/CallOfTheDay/GetDaily?UserID=${userID}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();
    // Log the response received from the /CallOfTheDay/GetDaily endpoint
    console.log(
      "%cResponse from /CallOfTheDay/GetDaily",
      "color: green; background: black",
      data
    );
    return data;
  } catch (error: any) {
    // Log any error that occurs during the fetching of daily data
    console.error(
      "%cERROR in getDailyData:",
      "color: red; background: black",
      error
    );
    return error;
  }
};

// Function to fetch media data by sending a GET request to /api/v1/Media/Get
export const getMedia = async (mediaId: string) => {
  // Log the initiation of a GET request to /api/v1/Media/Get with media ID
  console.log(
    "%cSending GET request to /api/v1/Media/Get",
    "color: red; background: black",
    {
      method: "GET",
      endpoint: "/api/v1/Media/Get",
      headers: { IDMedia: mediaId },
      body: null,
      apiType: "FILES",
    }
  );

  const res = await sendRequest("FILES").get("/api/v1/Media/Get", {
    headers: {
      IDMedia: mediaId,
    },
  });

  const data = await res.data;
  // Log the response received from the /api/v1/Media/Get endpoint
  console.log(
    "%cResponse from /api/v1/Media/Get",
    "color: green; background: black",
    data
  );
  return data?.data as MediaType;
};

export const generateMediaSrc = (mediaId: string) => {
  const url = `${process.env.NEXT_PUBLIC_FILES_BASE_URL}/api/File/DownloadFile?IDMedia=${mediaId}`;
  return url;
};