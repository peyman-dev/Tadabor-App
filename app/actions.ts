import { sendRequest } from "./core/api/axios";

export const login = async (payload) => {
  const res = await sendRequest("USER").post("/Login/Login",);
};
