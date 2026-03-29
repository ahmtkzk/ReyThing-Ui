"use client";

import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ContentCard } from "./content-card";
import { ContentType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  year: number;
  poster: string;
  genres: string[];
  averageRating: number;
  commentCount?: number;
}

interface ContentGridProps {
  title: string;
  items: ContentItem[];
  type: ContentType;
  viewAllHref?: string;
  className?: string;
  columns?: 4 | 5 | 6;
}

export function ContentGrid({
  title,
  items,
  type,
  viewAllHref,
  className,
  columns = 5,
}: ContentGridProps) {
  const gridCols = {
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
  };

  return (
    <section className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* Grid */}
      <div className={cn("grid gap-4", gridCols[columns])}>
        {items.map((item) => (
          <ContentCard
            key={item.id}
            id={item.id}
            title={item.title}
            year={item.year}
            poster={item.poster}
            genres={item.genres}
            averageRating={item.averageRating}
            type={type}
            commentCount={item.commentCount}
          />
        ))}
      </div>
    </section>
  );
}
