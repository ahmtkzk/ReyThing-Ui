"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Film, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/context/auth-context";
import { useLanguage } from "@/lib/context/language-context";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const success = await login(email, password);

    if (success) {
      navigate("/");
    } else {
      setError(t("login.invalidCredentials"));
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t("common.loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 md:space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-lg bg-primary">
              <Film className="h-5 md:h-6 w-5 md:w-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground font-[family-name:var(--font-script)] italic">ReyThing</span>
          </Link>
          <h1 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-foreground">{t("login.welcomeBack")}</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            {t("login.signInToContinue")}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-3 md:p-4">
          <p className="text-xs md:text-sm font-medium text-foreground mb-2">{t("login.demoCredentials")}</p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {t("login.email")}: <code className="bg-muted px-1 rounded">demo@example.com</code>
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {t("login.password")}: <code className="bg-muted px-1 rounded">demo123</code>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-xs md:text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-3 md:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">{t("login.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("login.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">{t("login.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("login.signingIn") : t("login.signIn")}
          </Button>
        </form>

        <p className="text-center text-xs md:text-sm text-muted-foreground">
          {t("login.noAccount")}{" "}
          <Link to="/signup" className="font-medium text-primary hover:underline">
            {t("nav.signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
}
