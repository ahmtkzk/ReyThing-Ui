"use client";

import { Link } from "react-router-dom";
import { Star, Film, Tv, BookOpen, MessageCircle } from "lucide-react";
import { ContentType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  id: string;
  title: string;
  year: number;
  poster: string;
  genres: string[];
  averageRating: number;
  type: ContentType;
  commentCount?: number;
  className?: string;
}

const typeConfig = {
  movie: { href: "/movies", icon: Film, label: "Movie" },
  tv: { href: "/tv-shows", icon: Tv, label: "TV Show" },
  book: { href: "/books", icon: BookOpen, label: "Book" },
};

export function ContentCard({
  id,
  title,
  year,
  poster,
  genres,
  averageRating,
  type,
  commentCount,
  className,
}: ContentCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const href = `${config.href}/${id}`;

  return (
    <Link
      to={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        className
      )}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={poster}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-2 py-1">
          <Icon className="h-3 w-3 text-primary" />
          <span className="text-xs font-medium">{config.label}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-2 py-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-medium">{averageRating.toFixed(1)}</span>
        </div>

        {/* Comment Count Badge */}
        {commentCount !== undefined && commentCount > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-2 py-1">
            <MessageCircle className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium">{commentCount}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 p-3">
        <h3 className="font-semibold text-sm line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground">{year}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
