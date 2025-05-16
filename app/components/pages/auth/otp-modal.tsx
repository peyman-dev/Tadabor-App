"use client";
import { Input } from "antd";
import React, { useState } from "react";
import PrimaryButton from "../../common/buttons/primary-button";
import { verifyOTP } from "@/app/actions";
import toast from "react-hot-toast";
import { ApiResponseType } from "@/app/core/types";

const OTPModal = ({ phone }: { phone: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [OTP, setOTP] = useState<string>("");

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
                        setIsLoading(false);
                        if (res.erroCode === 200) return "شما باموفقیت وارد شدید !";
                        throw new Error(res.message);
                    },
                    error: (res: ApiResponseType) => {
                        setIsLoading(false);
                        return String(res.message || "خطایی رخ داد");
                    },
                }
            );
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    };

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
                            // Only submit when OTP is complete (e.g., 4 digits)
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
                    disabled={isLoading || OTP.length !== 4} // Disable if loading or OTP incomplete
                    className=""
                >
                    ورود
                </PrimaryButton>
            </div>
        </div>
    );
};

export default OTPModal;