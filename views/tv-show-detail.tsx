"use client";

import { useParams, Link } from "react-router-dom";
import { Calendar, User, Users, ArrowLeft, Tv, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingWidget } from "@/components/user/rating-widget";
import { CommentSection } from "@/components/user/comment-section";
import { ContentCard } from "@/components/content/content-card";
import { getTVShowById, tvShows } from "@/lib/data/tv-shows";
import { useLanguage } from "@/lib/context/language-context";

export default function TVShowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const show = id ? getTVShowById(id) : null;

  if (!show) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">{t("tvShows.noResults")}</h1>
        <Button asChild>
          <Link to="/tv-shows">{t("nav.tvShows")}</Link>
        </Button>
      </div>
    );
  }

  const relatedShows = tvShows
    .filter(
      (s) =>
        s.id !== show.id && s.genres.some((g) => show.genres.includes(g))
    )
    .slice(0, 5);

  const yearDisplay = show.endYear
    ? `${show.year} - ${show.endYear}`
    : `${show.year} -`;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={show.backdrop}
          alt={show.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 sm:-mt-40 md:-mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="shrink-0 mx-auto lg:mx-0">
            <div className="relative w-36 sm:w-48 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-border">
              <img
                src={show.poster}
                alt={show.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 md:space-y-6">
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link to="/tv-shows">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("nav.tvShows")}
              </Link>
            </Button>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {show.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 md:h-4 w-3 md:w-4" />
                  {yearDisplay}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <Badge variant={show.status === "Ongoing" ? "default" : "secondary"} className="text-xs">
                  {show.status === "Ongoing" ? t("tvShows.ongoing") : t("tvShows.ended")}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Tv className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                <span className="text-sm md:text-base text-foreground font-medium">{show.seasons} {t("common.seasons")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                <span className="text-sm md:text-base text-foreground font-medium">{show.episodes} {t("common.episodes")}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {show.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            <div>
              <h2 className="text-base md:text-lg font-semibold text-foreground mb-2">{t("details.synopsis")}</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                {show.synopsis}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2 mb-1 md:mb-2">
                  <User className="h-3 md:h-4 w-3 md:w-4 text-primary" />
                  {t("details.creator")}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{show.creator}</p>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2 mb-1 md:mb-2">
                  <Users className="h-3 md:h-4 w-3 md:w-4 text-primary" />
                  {t("details.cast")}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{show.cast.join(", ")}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <RatingWidget
                contentId={show.id}
                contentType="tv"
                averageRating={show.averageRating}
                totalRatings={show.totalRatings}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
          <CommentSection contentId={show.id} contentType="tv" />
        </div>

        {relatedShows.length > 0 && (
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
              {t("home.viewAll")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {relatedShows.map((s) => (
                <ContentCard
                  key={s.id}
                  id={s.id}
                  title={s.title}
                  year={s.year}
                  poster={s.poster}
                  genres={s.genres}
                  averageRating={s.averageRating}
                  type="tv"
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
