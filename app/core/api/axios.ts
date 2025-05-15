import axios from "axios";

type API_METHOD = "USER" | "FILES";

export const sendRequest = (method: API_METHOD = "USER") =>
  axios.create({
    baseURL:
      method == "USER" ? process.env.USER_BASE_URL : process.env.FILES_BASE_URL,
  });
