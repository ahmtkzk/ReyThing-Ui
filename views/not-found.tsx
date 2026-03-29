"use client";

import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl md:text-2xl text-foreground mb-2">Page Not Found</p>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link to="/" className="gap-2">
          <Home className="h-4 w-4" />
          {t("nav.movies")}
        </Link>
      </Button>
    </div>
  );
}
