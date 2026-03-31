"use client";

import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/context/language-context";
import { Movie } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FeaturedCarouselProps {
  items: Movie[];
}

export function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const currentItem = items[currentIndex];

  return (
    <div
      className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Images */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={item.backdrop}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-end pb-16 sm:pb-12 sm:items-center">
        <div className="max-w-2xl space-y-3 sm:space-y-4 md:space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-medium">
              {t("home.featured")}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Star className="h-3.5 sm:h-4 w-3.5 sm:w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium text-foreground">
                {currentItem.averageRating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground text-balance leading-tight">
            {currentItem.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
            <span>{currentItem.year}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{currentItem.runtime} {t("common.min")}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground hidden sm:block" />
            <span className="hidden sm:inline">{currentItem.genres.slice(0, 3).join(", ")}</span>
          </div>

          {/* Synopsis - hidden on very small screens */}
          <p className="hidden sm:block text-sm md:text-base text-muted-foreground line-clamp-2 md:line-clamp-3 text-pretty max-w-xl">
            {currentItem.synopsis}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
            <Button asChild size="default" className="gap-1.5 sm:gap-2 text-sm sm:text-base h-9 sm:h-10 md:h-11 px-4 sm:px-6">
              <Link to={`/movies/${currentItem.id}`}>
                <Play className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                {t("home.viewDetails")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - hidden on mobile */}
      <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={prev}
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <ChevronLeft className="h-4 sm:h-5 w-4 sm:w-5" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={next}
          className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <ChevronRight className="h-4 sm:h-5 w-4 sm:w-5" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-1.5 sm:h-2 rounded-full transition-all",
              index === currentIndex
                ? "w-6 sm:w-8 bg-primary"
                : "w-1.5 sm:w-2 bg-foreground/30 hover:bg-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
