"use client";

import { useParams, Link } from "react-router-dom";
import Image from "next/image";
import { Clock, Calendar, User, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingWidget } from "@/components/user/rating-widget";
import { CommentSection } from "@/components/user/comment-section";
import { ContentCard } from "@/components/content/content-card";
import { getMovieById, movies } from "@/lib/data/movies";
import { useLanguage } from "@/lib/context/language-context";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const movie = id ? getMovieById(id) : null;

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">{t("movies.noResults")}</h1>
        <Button asChild>
          <Link to="/movies">{t("nav.movies")}</Link>
        </Button>
      </div>
    );
  }

  const relatedMovies = movies
    .filter(
      (m) =>
        m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
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

      <div className="container mx-auto px-4 -mt-32 sm:-mt-40 md:-mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="shrink-0 mx-auto lg:mx-0">
            <div className="relative w-36 sm:w-48 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-border">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 md:space-y-6">
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link to="/movies">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("nav.movies")}
              </Link>
            </Button>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 md:h-4 w-3 md:w-4" />
                  {movie.year}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="flex items-center gap-1">
                  <Clock className="h-3 md:h-4 w-3 md:w-4" />
                  {movie.runtime} {t("common.min")}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            <div>
              <h2 className="text-base md:text-lg font-semibold text-foreground mb-2">{t("details.synopsis")}</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                {movie.synopsis}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2 mb-1 md:mb-2">
                  <User className="h-3 md:h-4 w-3 md:w-4 text-primary" />
                  {t("details.director")}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{movie.director}</p>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2 mb-1 md:mb-2">
                  <Users className="h-3 md:h-4 w-3 md:w-4 text-primary" />
                  {t("details.cast")}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{movie.cast.join(", ")}</p>
              </div>
            </div>

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

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
          <CommentSection contentId={movie.id} contentType="movie" />
        </div>

        {relatedMovies.length > 0 && (
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
              {t("home.viewAll")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
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

      <div className="h-12 md:h-16" />
    </div>
  );
}
