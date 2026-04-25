import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import Toast from "./components/Toast/Toast";
import ToastProvider from "./Context/Toast/ToastProvider";
import "./styles/globals.scss";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import { Providers } from "./lib/providers";

const geistNoto = Noto_Sans_Thai({
  variable: "--font-Noto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KKU Engineering Workshop",
  description: "KKU Engineering Workshop tools reservation system developed by COE team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistNoto.variable} `}>
        <ToastProvider>
          <AuthProvider>
            <Providers>
              {children}
            </Providers>
          </AuthProvider>  
          <Toast Position="bottom-right"></Toast>
        </ToastProvider>
      </body>
    </html>
  );
}
