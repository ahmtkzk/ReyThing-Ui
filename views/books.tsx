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
import { books, bookGenres } from "@/lib/data/books";
import { useLanguage } from "@/lib/context/language-context";
import { Search, SlidersHorizontal, X } from "lucide-react";

type SortOption = "rating" | "year" | "title" | "popular";

export default function BooksPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
      );
    }

    if (selectedGenre && selectedGenre !== "all") {
      result = result.filter((book) => book.genres.includes(selectedGenre));
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
  }, [searchQuery, selectedGenre, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSortBy("popular");
  };

  const hasActiveFilters = searchQuery || selectedGenre !== "all" || sortBy !== "popular";

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t("books.title")}</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          {t("books.browseDescription").replace("{count}", books.length.toString())}
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("books.searchPlaceholder")}
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

          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <Label htmlFor="genre" className="text-sm whitespace-nowrap">
                {t("movies.genre")}:
              </Label>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger id="genre" className="w-36 md:w-40">
                  <SelectValue placeholder={t("movies.allGenres")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("movies.allGenres")}</SelectItem>
                  {bookGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
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
                  {bookGenres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
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

      {filteredBooks.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-4">
            {filteredBooks.length === 1
              ? t("books.showingSingular")
              : t("books.showing").replace("{count}", filteredBooks.length.toString())}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {filteredBooks.map((book) => (
              <ContentCard
                key={book.id}
                id={book.id}
                title={book.title}
                year={book.year}
                poster={book.cover}
                genres={book.genres}
                averageRating={book.averageRating}
                type="book"
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12 md:py-16">
          <p className="text-base md:text-lg text-muted-foreground mb-4">{t("books.noResults")}</p>
          <Button variant="outline" onClick={clearFilters}>
            {t("movies.clearFilters")}
          </Button>
        </div>
      )}
    </div>
  );
}
