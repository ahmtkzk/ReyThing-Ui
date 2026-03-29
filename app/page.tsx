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
import { ContentType } from "@/lib/types";

export default function HomePage() {
  const { comments } = useUserData();

  // Helper function to get comment count for content
  const getCommentCount = (contentId: string, contentType: ContentType) => {
    return comments.filter(c => c.contentId === contentId && c.contentType === contentType).length;
  };
  // Featured movies for carousel (top rated)
  const featuredMovies = movies
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 5);

  // Trending content (sorted by total ratings)
  const trendingMovies = movies
    .sort((a, b) => b.totalRatings - a.totalRatings)
    .slice(0, 10);

  const trendingShows = tvShows
    .sort((a, b) => b.totalRatings - a.totalRatings)
    .slice(0, 10);

  const trendingBooks = books
    .sort((a, b) => b.totalRatings - a.totalRatings)
    .slice(0, 10);

  // Recently added (using a random shuffle for demo)
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
      {/* Hero Carousel */}
      <FeaturedCarousel items={featuredMovies} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Trending Section with Tabs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
          <Tabs defaultValue="movies" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="movies" className="gap-2">
                <Film className="h-4 w-4" />
                Movies
              </TabsTrigger>
              <TabsTrigger value="tv" className="gap-2">
                <Tv className="h-4 w-4" />
                TV Shows
              </TabsTrigger>
              <TabsTrigger value="books" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Books
              </TabsTrigger>
            </TabsList>

            <TabsContent value="movies" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

            <TabsContent value="tv" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

            <TabsContent value="books" className="mt-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

        {/* Recently Added Movies */}
        <ContentGrid
          title="New Movies"
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

        {/* Recently Added TV Shows */}
        <ContentGrid
          title="New TV Shows"
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

        {/* Recently Added Books */}
        <ContentGrid
          title="New Books"
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
