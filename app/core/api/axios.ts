import axios from "axios";

type API_METHOD = "USER" | "FILES";

const getBaseUrl = (type: API_METHOD = "USER") => {
  switch (type) {
    case "USER":
      return process.env.NEXT_PUBLIC_USER_BASE_URL;
    case "FILES":
      return process.env.NEXT_PUBLIC_FILES_BASE_URL;
    default:
      return process.env.NEXT_PUBLIC_USER_BASE_URL;
  }
};

export const sendRequest = (type: API_METHOD = "USER") =>
  axios.create({
    baseURL: getBaseUrl(type),
  });
