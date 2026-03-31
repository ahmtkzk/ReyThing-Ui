import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/lib/context/auth-context";
import { UserDataProvider } from "@/lib/context/user-data-context";
import { LanguageProvider } from "@/lib/context/language-context";
import { AppRouter } from "@/lib/router";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
