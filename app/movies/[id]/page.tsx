import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, User, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingWidget } from "@/components/user/rating-widget";
import { CommentSection } from "@/components/user/comment-section";
import { ContentCard } from "@/components/content/content-card";
import { getMovieById, movies } from "@/lib/data/movies";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) {
    notFound();
  }

  // Get related movies (same genre)
  const relatedMovies = movies
    .filter(
      (m) =>
        m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <Image
          src={movie.backdrop}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            <div className="relative w-48 sm:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-border">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6">
            {/* Back Button */}
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link href="/movies">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Movies
              </Link>
            </Button>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {movie.year}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {movie.runtime} min
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {movie.synopsis}
              </p>
            </div>

            {/* Credits */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  Director
                </h3>
                <p className="text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  Cast
                </h3>
                <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
              </div>
            </div>

            {/* Rating Widget */}
            <div className="pt-4 border-t border-border">
              <RatingWidget
                contentId={movie.id}
                contentType="movie"
                averageRating={movie.averageRating}
                totalRatings={movie.totalRatings}
              />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <CommentSection contentId={movie.id} contentType="movie" />
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedMovies.map((m) => (
                <ContentCard
                  key={m.id}
                  id={m.id}
                  title={m.title}
                  year={m.year}
                  poster={m.poster}
                  genres={m.genres}
                  averageRating={m.averageRating}
                  type="movie"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="h-16" />
    </div>
  );
}
