"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Film, Tv, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentCard } from "@/components/content/content-card";
import { searchMovies } from "@/lib/data/movies";
import { searchTVShows } from "@/lib/data/tv-shows";
import { searchBooks } from "@/lib/data/books";
import { useLanguage } from "@/lib/context/language-context";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return {
        movies: [],
        tvShows: [],
        books: [],
        total: 0,
      };
    }

    const movieResults = searchMovies(query);
    const tvResults = searchTVShows(query);
    const bookResults = searchBooks(query);

    return {
      movies: movieResults,
      tvShows: tvResults,
      books: bookResults,
      total: movieResults.length + tvResults.length + bookResults.length,
    };
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-2xl mx-auto mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4 md:mb-6">
          {t("search.title")}
        </h1>
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("search.searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 md:pl-12 h-10 md:h-12 text-base md:text-lg"
            autoFocus
          />
        </div>
      </div>

      {query.trim() ? (
        <>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            {results.total === 1
              ? t("search.resultFor").replace("{query}", query)
              : t("search.resultsFor")
                  .replace("{count}", results.total.toString())
                  .replace("{query}", query)}
          </p>

          {results.total > 0 ? (
            <Tabs defaultValue="all" className="space-y-4 md:space-y-6">
              <TabsList className="flex-wrap h-auto p-1">
                <TabsTrigger value="all" className="text-xs sm:text-sm">
                  {t("search.all")} ({results.total})
                </TabsTrigger>
                <TabsTrigger value="movies" className="gap-1.5 text-xs sm:text-sm">
                  <Film className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{t("nav.movies")}</span> ({results.movies.length})
                </TabsTrigger>
                <TabsTrigger value="tv" className="gap-1.5 text-xs sm:text-sm">
                  <Tv className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{t("nav.tvShows")}</span> ({results.tvShows.length})
                </TabsTrigger>
                <TabsTrigger value="books" className="gap-1.5 text-xs sm:text-sm">
                  <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">{t("nav.books")}</span> ({results.books.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-6 md:space-y-8">
                  {results.movies.length > 0 && (
                    <div>
                      <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                        <Film className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                        {t("nav.movies")}
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                        {results.movies.map((movie) => (
                          <ContentCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            year={movie.year}
                            poster={movie.poster}
                            genres={movie.genres}
                            averageRating={movie.averageRating}
                            type="movie"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {results.tvShows.length > 0 && (
                    <div>
                      <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                        <Tv className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                        {t("nav.tvShows")}
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                        {results.tvShows.map((show) => (
                          <ContentCard
                            key={show.id}
                            id={show.id}
                            title={show.title}
                            year={show.year}
                            poster={show.poster}
                            genres={show.genres}
                            averageRating={show.averageRating}
                            type="tv"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {results.books.length > 0 && (
                    <div>
                      <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                        <BookOpen className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                        {t("nav.books")}
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                        {results.books.map((book) => (
                          <ContentCard
                            key={book.id}
                            id={book.id}
                            title={book.title}
                            year={book.year}
                            poster={book.cover}
                            genres={book.genres}
                            averageRating={book.averageRating}
                            type="book"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="movies">
                {results.movies.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {results.movies.map((movie) => (
                      <ContentCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        year={movie.year}
                        poster={movie.poster}
                        genres={movie.genres}
                        averageRating={movie.averageRating}
                        type="movie"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-12 text-muted-foreground">
                    {t("movies.noResults")}
                  </p>
                )}
              </TabsContent>

              <TabsContent value="tv">
                {results.tvShows.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {results.tvShows.map((show) => (
                      <ContentCard
                        key={show.id}
                        id={show.id}
                        title={show.title}
                        year={show.year}
                        poster={show.poster}
                        genres={show.genres}
                        averageRating={show.averageRating}
                        type="tv"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-12 text-muted-foreground">
                    {t("tvShows.noResults")}
                  </p>
                )}
              </TabsContent>

              <TabsContent value="books">
                {results.books.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {results.books.map((book) => (
                      <ContentCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        year={book.year}
                        poster={book.cover}
                        genres={book.genres}
                        averageRating={book.averageRating}
                        type="book"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-12 text-muted-foreground">
                    {t("books.noResults")}
                  </p>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-12 md:py-16">
              <Search className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-sm md:text-base text-muted-foreground">
                {t("search.noResults")}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 md:py-16">
          <Search className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-sm md:text-base text-muted-foreground mb-2">
            {t("search.searchFor")}
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">
            {t("search.trySearching")}
          </p>
        </div>
      )}
    </div>
  );
}
