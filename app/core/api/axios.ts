import axios from "axios";

type API_METHOD = "USER" | "FILES";

const getBaseUrl = (type: API_METHOD = "USER") => {
  switch (type) {
    case "USER":
      return "https://api.tadaborzendegi.ir/usermanagement";
    case "FILES":
      return "https://api.tadaborzendegi.ir/mediaapi";
    default:
      return "https://api.tadaborzendegi.ir/usermanagement";
  }
};

export const sendRequest = (type: API_METHOD = "USER") => axios.create({
  baseURL: getBaseUrl(type),
});
