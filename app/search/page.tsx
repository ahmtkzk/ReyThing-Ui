"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Film, Tv, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentCard } from "@/components/content/content-card";
import { movies, searchMovies } from "@/lib/data/movies";
import { tvShows, searchTVShows } from "@/lib/data/tv-shows";
import { books, searchBooks } from "@/lib/data/books";

function SearchContent() {
  const searchParams = useSearchParams();
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
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground text-center mb-6">
          Search
        </h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies, TV shows, books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-12 text-lg"
            autoFocus
          />
        </div>
      </div>

      {/* Results */}
      {query.trim() ? (
        <>
          <p className="text-muted-foreground mb-6">
            Found {results.total} {results.total === 1 ? "result" : "results"} for &quot;{query}&quot;
          </p>

          {results.total > 0 ? (
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList>
                <TabsTrigger value="all">
                  All ({results.total})
                </TabsTrigger>
                <TabsTrigger value="movies" className="gap-2">
                  <Film className="h-4 w-4" />
                  Movies ({results.movies.length})
                </TabsTrigger>
                <TabsTrigger value="tv" className="gap-2">
                  <Tv className="h-4 w-4" />
                  TV ({results.tvShows.length})
                </TabsTrigger>
                <TabsTrigger value="books" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Books ({results.books.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-8">
                  {results.movies.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Film className="h-5 w-5 text-primary" />
                        Movies
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Tv className="h-5 w-5 text-primary" />
                        TV Shows
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        Books
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                    No movies found
                  </p>
                )}
              </TabsContent>

              <TabsContent value="tv">
                {results.tvShows.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                    No TV shows found
                  </p>
                )}
              </TabsContent>

              <TabsContent value="books">
                {results.books.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                    No books found
                  </p>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-16">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                No results found. Try a different search term.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground mb-2">
            Search for movies, TV shows, or books
          </p>
          <p className="text-sm text-muted-foreground">
            Try searching for titles, directors, actors, or authors
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-foreground text-center mb-6">
            Search
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies, TV shows, books..."
              className="pl-12 h-12 text-lg"
              disabled
            />
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
