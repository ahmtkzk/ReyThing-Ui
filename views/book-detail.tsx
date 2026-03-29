"use client";

import { useParams, Link } from "react-router-dom";
import Image from "next/image";
import { Calendar, User, BookOpen, Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingWidget } from "@/components/user/rating-widget";
import { CommentSection } from "@/components/user/comment-section";
import { ContentCard } from "@/components/content/content-card";
import { getBookById, books } from "@/lib/data/books";
import { useLanguage } from "@/lib/context/language-context";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const book = id ? getBookById(id) : null;

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">{t("books.noResults")}</h1>
        <Button asChild>
          <Link to="/books">{t("nav.books")}</Link>
        </Button>
      </div>
    );
  }

  const relatedBooks = books
    .filter(
      (b) =>
        b.id !== book.id &&
        (b.author === book.author || b.genres.some((g) => book.genres.includes(g)))
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 sm:-mt-40 md:-mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="shrink-0 mx-auto lg:mx-0">
            <div className="relative w-36 sm:w-48 md:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-border bg-muted">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1 space-y-4 md:space-y-6">
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link to="/books">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("nav.books")}
              </Link>
            </Button>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {book.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 md:h-4 w-3 md:w-4" />
                  {book.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 md:h-4 w-3 md:w-4" />
                  {book.year}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                <span className="text-sm md:text-base text-foreground font-medium">{book.pages} {t("common.pages")}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {book.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">
                  {genre}
                </Badge>
              ))}
            </div>

            <div>
              <h2 className="text-base md:text-lg font-semibold text-foreground mb-2">{t("details.synopsis")}</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">
                {book.synopsis}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2 mb-1 md:mb-2">
                  <Building2 className="h-3 md:h-4 w-3 md:w-4 text-primary" />
                  Publisher
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{book.publisher}</p>
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-foreground flex items-center gap-2 mb-1 md:mb-2">
                  <BookOpen className="h-3 md:h-4 w-3 md:w-4 text-primary" />
                  ISBN
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{book.isbn}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <RatingWidget
                contentId={book.id}
                contentType="book"
                averageRating={book.averageRating}
                totalRatings={book.totalRatings}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
          <CommentSection contentId={book.id} contentType="book" />
        </div>

        {relatedBooks.length > 0 && (
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">
              {t("home.viewAll")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {relatedBooks.map((b) => (
                <ContentCard
                  key={b.id}
                  id={b.id}
                  title={b.title}
                  year={b.year}
                  poster={b.cover}
                  genres={b.genres}
                  averageRating={b.averageRating}
                  type="book"
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
