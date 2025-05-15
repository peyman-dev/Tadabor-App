import { z } from "zod";
import { LoginMethodType } from "../types";

export const loginValidation = (method: LoginMethodType) =>
  z.object({
    phoneNumber: z
      .string()
      .regex(/^\d{11}$/, "شماره موبایل باید 11 کاراکتر باشد")
      .transform(Number),
    ...(method === "PASSWORD"
      ? { password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد") }
      : {}),
  });
export const registerValidation = z.object({
  phone: z
    .string()
    .regex(/^\d{11}$/, "شماره موبایل باید 11 کاراکتر باشد")
    .transform(Number),
  name: z.string().min(3, "لطفا نام خود را به درستی وارد نمائید"),
  family: z.string().min(3, "لطفا نام خانوادگی خود را به درستی وارد نمائید"),
});
