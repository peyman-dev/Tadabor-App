"use client";
import { Input } from "antd";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../common/buttons/primary-button";
import { verifyOTP } from "@/app/actions";
import toast from "react-hot-toast";
import { ApiResponseType } from "@/app/core/types/types";
import { generateCacheForUserResponse } from "@/app/core/utils";

const OTPModal = ({ phone }: { phone: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [OTP, setOTP] = useState<string>("");
    const [response, setResponse] = useState<ApiResponseType>()

    const handleSubmit = async (otp: string) => {
        // Prevent submission if already loading or OTP is empty
        if (isLoading || !otp) return;

        try {


            setIsLoading(true);
            await toast.promise(
                verifyOTP({
                    Code: String(otp),
                    Phone: String(phone),
                }),
                {
                    loading: "درحال ورود, منتظر بمانید ...",
                    success: (res: ApiResponseType) => {
                        setResponse(res)
                        generateCacheForUserResponse(res)
                        if (res.erroCode === 200) return "شما باموفقیت وارد شدید !";
                        throw new Error(res.message);
                    },
                    error: (res: ApiResponseType) => {
                        return String(res.message || "خطایی رخ داد");
                    },
                }
            ).finally(() => {
                setIsLoading(false);
            })
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    };

    useEffect(() => {
        if (!isLoading && !!response?.erroCode) {
            if (response.erroCode) redirect("/dashboard");
            else return () => {}
        }
    }, [isLoading, response])


    return (
        <div className="my-10 w-full">
            <div className="flex items-center justify-center flex-col gap-5">
                <div className="text-center">
                    <p className="text-green-500 font-IRANSans-Medium">
                        کد ورود به شماره {phone} ارسال شد !
                    </p>
                    <p className="text-gray font-IRANSans-Regular mt-2">
                        لطفا کد ارسال شده به تلفن همراه خود را وارد نمایید
                    </p>
                </div>
                <div dir="ltr" className="max-w-[200px]">
                    <Input.OTP
                        onChange={(v: string) => {
                            setOTP(v);
                            if (v.length === 4) {
                                handleSubmit(v);
                            }
                        }}
                        type="number"
                        length={4}
                    />
                </div>
                <PrimaryButton
                    loading={isLoading}
                    onClick={() => handleSubmit(OTP)}
                    disabled={isLoading || OTP.length !== 4}
                    className=""
                >
                    ورود
                </PrimaryButton>
            </div>
        </div>
    );
};

export default OTPModal;