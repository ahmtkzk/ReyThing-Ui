"use client";

import { Link } from "react-router-dom";
import { Film, Tv, BookOpen, Github, Twitter } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-3 md:space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-7 md:h-8 w-7 md:w-8 items-center justify-center rounded-lg bg-primary">
                <Film className="h-4 md:h-5 w-4 md:w-5 text-primary-foreground" />
              </div>
              <span className="text-xl md:text-2xl font-bold font-[family-name:var(--font-script)] italic">ReyThing</span>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t("footer.description")}
            </p>
          </div>

          {/* Browse */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider">{t("footer.browse")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/movies"
                  className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Film className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  {t("nav.movies")}
                </Link>
              </li>
              <li>
                <Link
                  to="/tv-shows"
                  className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Tv className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  {t("nav.tvShows")}
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-3.5 md:h-4 w-3.5 md:w-4" />
                  {t("nav.books")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider">{t("footer.community")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/lists"
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("footer.publicLists")}
                </Link>
              </li>
              <li>
                <Link
                  to="/search"
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("nav.search")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3 md:space-y-4">
            <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider">{t("footer.connect")}</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 md:h-5 w-4 md:w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 md:h-5 w-4 md:w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 border-t border-border pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ReyThing. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
