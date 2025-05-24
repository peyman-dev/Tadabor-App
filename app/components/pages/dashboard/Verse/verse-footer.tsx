"use client";
import FooterHolder from "@/app/assets/svgs/footer-holder";
import useQuickInformation from "@/app/core/hooks/use-quick-information";
import { useHolyStore } from "@/app/core/stores/holy.store";
import { InformationSentence } from "@/app/core/types/types";
import React from "react";

const VerseFooter = ({ content }: { content?: any }) => {
    const { data } = useHolyStore();
    const informationSentences = (data?.informationSentences as InformationSentence[]) || [];

    const juzItem = useQuickInformation(informationSentences, "جزء");
    const hezbItem = useQuickInformation(informationSentences, "حزب");
    const siaqItem = useQuickInformation(informationSentences, "سیاق");

    return (
        <>
            <FooterHolder className="absolute !left-0 -bottom-6 !right-0 !mx-auto" />
            <div className="absolute flex flex-col items-center justify-center !left-0 -bottom-1.5 sm:gap-1 !right-0 !mx-auto">
                <p className="text-xs sm:text-xs">
                    {/* فقط در صورت وجود مقدار، آیتم نمایش داده می‌شود */}
                    {juzItem?.value && `جزء ${juzItem.value}`}
                    {juzItem?.value && (hezbItem?.value || siaqItem?.value) && " | "}
                    {hezbItem?.value && `حزب ${hezbItem.value}`}
                    {hezbItem?.value && siaqItem?.value && " | "}
                    {siaqItem?.value && `سیاق ${siaqItem.value}`}
                    {/* اگر هیچ آیتمی وجود نداشت، متن "نامشخص" نمایش داده می‌شود */}
                    {!juzItem?.value && !hezbItem?.value && !siaqItem?.value && "نامشخص"}
                </p>
                <p className="text-[10px] sm:text-xs">
                    گروه تحقیقاتی تدبرّ درکلام وحی
                </p>
            </div>
        </>
    );
};

export default VerseFooter;