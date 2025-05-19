import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./components/common/modal";
import AuthenticationProvider from "./core/providers/auth-provider";
import { createSession } from "./actions";


export const metadata: Metadata = {
  title: "اپلیکیشن تدبر",
  description: "اپلیکیشن تدبر",
  
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // await getDailyData()
  await createSession();

  return (
    <html lang="fa-IR" dir="rtl">
      <body
      >
        <AuthenticationProvider>
          <ModalProvider>
            <Toaster />
            {children}
          </ModalProvider>
        </AuthenticationProvider>
      </body>
    </html>
  );
}
