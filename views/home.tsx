"use client";

import { FeaturedCarousel } from "@/components/content/featured-carousel";
import { ContentGrid } from "@/components/content/content-grid";
import { ContentCard } from "@/components/content/content-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Film, Tv, BookOpen } from "lucide-react";
import { movies } from "@/lib/data/movies";
import { tvShows } from "@/lib/data/tv-shows";
import { books } from "@/lib/data/books";
import { useUserData } from "@/lib/context/user-data-context";
import { useLanguage } from "@/lib/context/language-context";
import { ContentType } from "@/lib/types";

export default function HomePage() {
  const { comments } = useUserData();
  const { t } = useLanguage();

  const getCommentCount = (contentId: string, contentType: ContentType) => {
    return comments.filter(c => c.contentId === contentId && c.contentType === contentType).length;
  };

  const featuredMovies = movies
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);

  const trendingMovies = movies
    .sort((a, b) => b.totalRatings - a.totalRatings)
    .slice(0, 10);

  const trendingShows = tvShows
    .sort((a, b) => b.totalRatings - a.totalRatings)
    .slice(0, 10);

  const trendingBooks = books
    .sort((a, b) => b.totalRatings - a.totalRatings)
    .slice(0, 10);

  const recentMovies = [...movies]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const recentShows = [...tvShows]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  const recentBooks = [...books]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      <FeaturedCarousel items={featuredMovies} />

      <div className="container mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-16">
        <section className="space-y-4 md:space-y-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{t("home.trendingNow")}</h2>
          <Tabs defaultValue="movies" className="space-y-4 md:space-y-6">
            <TabsList className="bg-muted/50 flex-wrap h-auto p-1">
              <TabsTrigger value="movies" className="gap-1.5 text-xs sm:text-sm">
                <Film className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">{t("nav.movies")}</span>
                <span className="xs:hidden">{t("content.movie")}</span>
              </TabsTrigger>
              <TabsTrigger value="tv" className="gap-1.5 text-xs sm:text-sm">
                <Tv className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">{t("nav.tvShows")}</span>
                <span className="xs:hidden">{t("content.tv")}</span>
              </TabsTrigger>
              <TabsTrigger value="books" className="gap-1.5 text-xs sm:text-sm">
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">{t("nav.books")}</span>
                <span className="xs:hidden">{t("content.book")}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="movies" className="mt-4 md:mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {trendingMovies.map((movie) => (
                  <ContentCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    year={movie.year}
                    poster={movie.poster}
                    genres={movie.genres}
                    averageRating={movie.averageRating}
                    type="movie"
                    commentCount={getCommentCount(movie.id, "movie")}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tv" className="mt-4 md:mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {trendingShows.map((show) => (
                  <ContentCard
                    key={show.id}
                    id={show.id}
                    title={show.title}
                    year={show.year}
                    poster={show.poster}
                    genres={show.genres}
                    averageRating={show.averageRating}
                    type="tv"
                    commentCount={getCommentCount(show.id, "tv")}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="books" className="mt-4 md:mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {trendingBooks.map((book) => (
                  <ContentCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    year={book.year}
                    poster={book.cover}
                    genres={book.genres}
                    averageRating={book.averageRating}
                    type="book"
                    commentCount={getCommentCount(book.id, "book")}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <ContentGrid
          title={t("home.newMovies")}
          items={recentMovies.map((m) => ({
            id: m.id,
            title: m.title,
            year: m.year,
            poster: m.poster,
            genres: m.genres,
            averageRating: m.averageRating,
            commentCount: getCommentCount(m.id, "movie"),
          }))}
          type="movie"
          viewAllHref="/movies"
        />

        <ContentGrid
          title={t("home.newTVShows")}
          items={recentShows.map((s) => ({
            id: s.id,
            title: s.title,
            year: s.year,
            poster: s.poster,
            genres: s.genres,
            averageRating: s.averageRating,
            commentCount: getCommentCount(s.id, "tv"),
          }))}
          type="tv"
          viewAllHref="/tv-shows"
        />

        <ContentGrid
          title={t("home.newBooks")}
          items={recentBooks.map((b) => ({
            id: b.id,
            title: b.title,
            year: b.year,
            poster: b.cover,
            genres: b.genres,
            averageRating: b.averageRating,
            commentCount: getCommentCount(b.id, "book"),
          }))}
          type="book"
          viewAllHref="/books"
        />
      </div>
    </div>
  );
}
