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
import { Search, SlidersHorizontal, X } from "lucide-react";

type SortOption = "rating" | "year" | "title" | "popular";
type StatusFilter = "all" | "Ongoing" | "Ended";

export default function TVShowsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredShows = useMemo(() => {
    let result = [...tvShows];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (show) =>
          show.title.toLowerCase().includes(query) ||
          show.creator.toLowerCase().includes(query) ||
          show.cast.some((actor) => actor.toLowerCase().includes(query))
      );
    }

    // Filter by genre
    if (selectedGenre && selectedGenre !== "all") {
      result = result.filter((show) => show.genres.includes(selectedGenre));
    }

    // Filter by status
    if (selectedStatus !== "all") {
      result = result.filter((show) => show.status === selectedStatus);
    }

    // Sort
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
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">TV Shows</h1>
        <p className="text-muted-foreground">
          Browse and discover {tvShows.length} TV shows in our collection
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search shows, creators, actors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <Button
            variant="outline"
            className="sm:hidden gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>

          {/* Desktop Filters */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="genre" className="text-sm whitespace-nowrap">
                Genre:
              </Label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger id="genre" className="w-32">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
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
                Status:
              </Label>
              <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as StatusFilter)}>
                <SelectTrigger id="status" className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Ended">Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="sort" className="text-sm whitespace-nowrap">
                Sort:
              </Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger id="sort" className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="year">Newest</SelectItem>
                  <SelectItem value="title">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Filters Dropdown */}
        {showFilters && (
          <div className="flex flex-col gap-4 p-4 rounded-lg border border-border bg-card sm:hidden">
            <div className="space-y-2">
              <Label htmlFor="genre-mobile">Genre</Label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger id="genre-mobile">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {tvGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-mobile">Status</Label>
              <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as StatusFilter)}>
                <SelectTrigger id="status-mobile">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                  <SelectItem value="Ended">Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort-mobile">Sort By</Label>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger id="sort-mobile">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="year">Newest</SelectItem>
                  <SelectItem value="title">A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="gap-1">
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      {filteredShows.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredShows.length} {filteredShows.length === 1 ? "show" : "shows"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">No TV shows found</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
