import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Users, ArrowLeft, Tv, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingWidget } from "@/components/user/rating-widget";
import { CommentSection } from "@/components/user/comment-section";
import { ContentCard } from "@/components/content/content-card";
import { getTVShowById, tvShows } from "@/lib/data/tv-shows";

interface TVShowPageProps {
  params: Promise<{ id: string }>;
}

export default async function TVShowPage({ params }: TVShowPageProps) {
  const { id } = await params;
  const show = getTVShowById(id);

  if (!show) {
    notFound();
  }

  // Get related shows (same genre)
  const relatedShows = tvShows
    .filter(
      (s) =>
        s.id !== show.id && s.genres.some((g) => show.genres.includes(g))
    )
    .slice(0, 5);

  const yearDisplay = show.endYear
    ? `${show.year} - ${show.endYear}`
    : `${show.year} - Present`;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <Image
          src={show.backdrop}
          alt={show.title}
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
                src={show.poster}
                alt={show.title}
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
              <Link href="/tv-shows">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to TV Shows
              </Link>
            </Button>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {show.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {yearDisplay}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <Badge variant={show.status === "Ongoing" ? "default" : "secondary"}>
                  {show.status}
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Tv className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">{show.seasons} Seasons</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">{show.episodes} Episodes</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {show.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {show.synopsis}
              </p>
            </div>

            {/* Credits */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-primary" />
                  Created by
                </h3>
                <p className="text-muted-foreground">{show.creator}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  Cast
                </h3>
                <p className="text-muted-foreground">{show.cast.join(", ")}</p>
              </div>
            </div>

            {/* Rating Widget */}
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

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <CommentSection contentId={show.id} contentType="tv" />
        </div>

        {/* Related Shows */}
        {relatedShows.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

      {/* Spacer */}
      <div className="h-16" />
    </div>
  );
}
