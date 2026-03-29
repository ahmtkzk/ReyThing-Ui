"use client";

import { useState, useMemo } from "react";
import { ContentCard } from "@/components/content/content-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tvShows, tvGenres } from "@/lib/data/tv-shows";
import { useLanguage } from "@/lib/context/language-context";
import { Search, SlidersHorizontal, X } from "lucide-react";

type SortOption = "rating" | "year" | "title" | "popular";
type StatusFilter = "all" | "Ongoing" | "Ended";

export default function TVShowsPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredShows = useMemo(() => {
    let result = [...tvShows];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (show) =>
          show.title.toLowerCase().includes(query) ||
          show.creator.toLowerCase().includes(query) ||
          show.cast.some((actor) => actor.toLowerCase().includes(query))
      );
    }

    if (selectedGenre && selectedGenre !== "all") {
      result = result.filter((show) => show.genres.includes(selectedGenre));
    }

    if (selectedStatus !== "all") {
      result = result.filter((show) => show.status === selectedStatus);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case "year":
        result.sort((a, b) => b.year - a.year);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "popular":
      default:
        result.sort((a, b) => b.totalRatings - a.totalRatings);
        break;
    }

    return result;
  }, [searchQuery, selectedGenre, selectedStatus, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedStatus("all");
    setSortBy("popular");
  };

  const hasActiveFilters =
    searchQuery || selectedGenre !== "all" || selectedStatus !== "all" || sortBy !== "popular";

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t("tvShows.title")}</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {t("tvShows.browseDescription").replace("{count}", tvShows.length.toString())}
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("tvShows.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            variant="outline"
            className="sm:hidden gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("movies.filters")}
          </Button>

          <div className="hidden sm:flex items-center gap-3 md:gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Label htmlFor="genre" className="text-sm whitespace-nowrap">
                {t("movies.genre")}:
              </Label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger id="genre" className="w-28 md:w-32">
                  <SelectValue placeholder={t("tvShows.all")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("movies.allGenres")}</SelectItem>
                  {tvGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="status" className="text-sm whitespace-nowrap">
                {t("tvShows.status")}:
              </Label>
              <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as StatusFilter)}>
                <SelectTrigger id="status" className="w-24 md:w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("tvShows.all")}</SelectItem>
                  <SelectItem value="Ongoing">{t("tvShows.ongoing")}</SelectItem>
                  <SelectItem value="Ended">{t("tvShows.ended")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="sort" className="text-sm whitespace-nowrap">
                {t("movies.sort")}:
              </Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger id="sort" className="w-32 md:w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t("movies.sortPopular")}</SelectItem>
                  <SelectItem value="rating">{t("movies.sortRating")}</SelectItem>
                  <SelectItem value="year">{t("movies.sortNewest")}</SelectItem>
                  <SelectItem value="title">{t("movies.sortAZ")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="h-4 w-4" />
                {t("movies.clear")}
              </Button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card sm:hidden">
            <div className="space-y-2">
              <Label htmlFor="genre-mobile">{t("movies.genre")}</Label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger id="genre-mobile">
                  <SelectValue placeholder={t("movies.allGenres")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("movies.allGenres")}</SelectItem>
                  {tvGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-mobile">{t("tvShows.status")}</Label>
              <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as StatusFilter)}>
                <SelectTrigger id="status-mobile">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("tvShows.all")}</SelectItem>
                  <SelectItem value="Ongoing">{t("tvShows.ongoing")}</SelectItem>
                  <SelectItem value="Ended">{t("tvShows.ended")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort-mobile">{t("movies.sort")}</Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger id="sort-mobile">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t("movies.sortPopular")}</SelectItem>
                  <SelectItem value="rating">{t("movies.sortRating")}</SelectItem>
                  <SelectItem value="year">{t("movies.sortNewest")}</SelectItem>
                  <SelectItem value="title">{t("movies.sortAZ")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="gap-1">
                <X className="h-4 w-4" />
                {t("movies.clearFilters")}
              </Button>
            )}
          </div>
        )}
      </div>

      {filteredShows.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {filteredShows.length === 1
              ? t("tvShows.showingSingular")
              : t("tvShows.showing").replace("{count}", filteredShows.length.toString())}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {filteredShows.map((show) => (
              <ContentCard
                key={show.id}
                id={show.id}
                title={show.title}
                year={show.year}
                poster={show.poster}
                genres={show.genres}
                averageRating={show.averageRating}
                type="tv"
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 md:py-16">
          <p className="text-base md:text-lg text-muted-foreground mb-4">{t("tvShows.noResults")}</p>
          <Button variant="outline" onClick={clearFilters}>
            {t("movies.clearFilters")}
          </Button>
        </div>
      )}
    </div>
  );
}
