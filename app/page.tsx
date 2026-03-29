"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/context/auth-context";
import { UserDataProvider } from "@/lib/context/user-data-context";
import { LanguageProvider } from "@/lib/context/language-context";
import { AppRouter } from "@/lib/router";

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <UserDataProvider>
          <LanguageProvider>
            <AppRouter />
          </LanguageProvider>
        </UserDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
