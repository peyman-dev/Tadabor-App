import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PrimaryButton from "./components/common/buttons/primary-button"

export default function NotFound() {
    return (
        <div
            dir="rtl"
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4"
        >
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 text-center">
                    <h1 className="text-9xl font-bold text-light-teal">404</h1>

                    <div className="mt-6 space-y-4">
                        <h2 className="text-2xl font-bold text-primary">صفحه مورد نظر یافت نشد!</h2>

                        <p className="text-light-teal/80">
                            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
                        </p>

                        <div className="pt-4">
                            <PrimaryButton>
                                <Link
                                    href="/dashboard"
                                    className="size-full flex items-center justify-center gap-2"
                                >
                                    <span>بازگشت به صفحه اصلی</span>
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                <div className="bg-light-teal/8 p-4 border-t border-blue-100">
                    <p className="text-sm text-primary text-center">
                        اگر فکر می‌کنید این یک اشتباه است، لطفاً با پشتیبانی تماس بگیرید.
                    </p>
                </div>
            </div>
        </div>
    )
}
