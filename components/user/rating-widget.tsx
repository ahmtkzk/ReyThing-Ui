"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/auth-context";
import { useUserData } from "@/lib/context/user-data-context";
import { ContentType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface RatingWidgetProps {
  contentId: string;
  contentType: ContentType;
  averageRating: number;
  totalRatings: number;
}

export function RatingWidget({
  contentId,
  contentType,
  averageRating,
  totalRatings,
}: RatingWidgetProps) {
  const { user } = useAuth();
  const { getUserRating, addRating, removeRating } = useUserData();
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const userRating = getUserRating(contentId, contentType);
  const displayRating = hoveredStar ?? userRating ?? 0;

  const handleRate = (score: number) => {
    if (!user) return;
    if (userRating === score) {
      removeRating(contentId, contentType);
    } else {
      addRating(contentId, contentType, score);
    }
  };

  return (
    <div className="space-y-4">
      {/* Average Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
          <span className="text-2xl font-bold text-foreground">
            {averageRating.toFixed(1)}
          </span>
        </div>
        <span className="text-muted-foreground">
          ({totalRatings.toLocaleString()} {totalRatings === 1 ? "rating" : "ratings"})
        </span>
      </div>

      {/* User Rating */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">
          {user ? "Your rating" : "Rate this"}
        </p>

        {user ? (
          <div className="flex items-center gap-2">
            <div
              className="flex gap-1"
              onMouseLeave={() => setHoveredStar(null)}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors",
                      star <= displayRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground hover:text-yellow-400/50"
                    )}
                  />
                </button>
              ))}
            </div>
            {userRating && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeRating(contentId, contentType)}
                className="text-muted-foreground"
              >
                Remove
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-7 w-7 text-muted-foreground/50"
                />
              ))}
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Sign in to rate</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
