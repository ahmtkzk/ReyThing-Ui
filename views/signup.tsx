"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Film, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/context/auth-context";
import { useLanguage } from "@/lib/context/language-context";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError(t("signup.passwordMismatch"));
      return;
    }

    if (formData.password.length < 6) {
      setError(t("signup.passwordTooShort"));
      return;
    }

    if (formData.username.length < 3) {
      setError(t("signup.usernameTooShort"));
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError(t("signup.usernameInvalid"));
      return;
    }

    setIsSubmitting(true);

    const success = await signup(
      formData.email,
      formData.password,
      formData.username,
      formData.displayName || formData.username
    );

    if (success) {
      navigate("/");
    } else {
      setError(t("signup.alreadyExists"));
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 md:py-12">
      <div className="w-full max-w-md space-y-6 md:space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-lg bg-primary">
              <Film className="h-5 md:h-6 w-5 md:w-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground font-[family-name:var(--font-script)] italic">ReyThing</span>
          </Link>
          <h1 className="mt-4 md:mt-6 text-xl md:text-2xl font-bold text-foreground">{t("signup.createAccount")}</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            {t("signup.joinUs")}
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
                name="email"
                type="email"
                placeholder={t("login.emailPlaceholder")}
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm">{t("signup.username")}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder={t("signup.usernamePlaceholder")}
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="username"
              />
              <p className="text-xs text-muted-foreground">
                {t("signup.usernameHint")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm">{t("signup.displayName")}</Label>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                placeholder={t("signup.displayNamePlaceholder")}
                value={formData.displayName}
                onChange={handleChange}
                autoComplete="name"
              />
              <p className="text-xs text-muted-foreground">
                {t("signup.displayNameHint")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm">{t("login.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("signup.createPassword")}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
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
              <p className="text-xs text-muted-foreground">
                {t("signup.passwordHint")}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">{t("signup.confirmPassword")}</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder={t("signup.confirmPasswordPlaceholder")}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("signup.creating") : t("signup.create")}
          </Button>
        </form>

        <p className="text-center text-xs md:text-sm text-muted-foreground">
          {t("signup.haveAccount")}{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            {t("nav.signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
