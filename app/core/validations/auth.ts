import { z } from "zod";

export const loginValidation = z.object({
    phoneNumber: z.string().regex(/^\d{11}$/, "شماره موبایل باید 11 کاراکتر باشد").transform(Number),
    password: z.string().regex(/^.{8,}$/, "رمز عبور باید حداقل 8 کاراکتر باشد")
})