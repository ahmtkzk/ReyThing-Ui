import Link from "next/link";
import { Film, Tv, BookOpen, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Film className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold font-[family-name:var(--font-script)] italic">ReyThing</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover, rate, and track your favorite movies, TV shows, and books.
              Create lists and share your recommendations.
            </p>
          </div>

          {/* Browse */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Browse</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/movies"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Film className="h-4 w-4" />
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/tv-shows"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Tv className="h-4 w-4" />
                  TV Shows
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  Books
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/lists"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Public Lists
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ReyThing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
