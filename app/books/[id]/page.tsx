import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, BookOpen, Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RatingWidget } from "@/components/user/rating-widget";
import { CommentSection } from "@/components/user/comment-section";
import { ContentCard } from "@/components/content/content-card";
import { getBookById, books } from "@/lib/data/books";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  // Get related books (same genre or author)
  const relatedBooks = books
    .filter(
      (b) =>
        b.id !== book.id &&
        (b.author === book.author || b.genres.some((g) => book.genres.includes(g)))
    )
    .slice(0, 5);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Books don't have backdrops, use gradient */}
      <div className="relative h-[300px] sm:h-[400px] overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cover */}
          <div className="shrink-0">
            <div className="relative w-48 sm:w-64 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-border bg-muted">
              <Image
                src={book.cover}
                alt={book.title}
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
              <Link href="/books">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Link>
            </Button>

            {/* Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {book.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {book.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {book.year}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">{book.pages} pages</span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2">
              {book.genres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Synopsis */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Synopsis</h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {book.synopsis}
              </p>
            </div>

            {/* Details */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Publisher
                </h3>
                <p className="text-muted-foreground">{book.publisher}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  ISBN
                </h3>
                <p className="text-muted-foreground">{book.isbn}</p>
              </div>
            </div>

            {/* Rating Widget */}
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

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <CommentSection contentId={book.id} contentType="book" />
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              You might also like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

      {/* Spacer */}
      <div className="h-16" />
    </div>
  );
}
