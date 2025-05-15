import { sendRequest } from "./core/api/axios";
import { ApiResponseType, LoginPayloadType } from "./core/types";

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
