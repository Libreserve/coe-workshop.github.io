"use client";

import ToastProvider from "@/app/Context/Toast/ToastProvider";
import { AuthProvider } from "@/app/Context/AuthContext/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/app/lib/store";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </AuthProvider>
  );
}
