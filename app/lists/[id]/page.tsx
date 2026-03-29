"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Globe, Lock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ContentCard } from "@/components/content/content-card";
import { useAuth } from "@/lib/context/auth-context";
import { useUserData } from "@/lib/context/user-data-context";
import { movies } from "@/lib/data/movies";
import { tvShows } from "@/lib/data/tv-shows";
import { books } from "@/lib/data/books";

interface ListPageProps {
  params: Promise<{ id: string }>;
}

export default function ListPage({ params }: ListPageProps) {
  const { id } = use(params);
  const { user } = useAuth();
  const { getListById, removeFromList, deleteList } = useUserData();

  const list = getListById(id);

  const isOwner = user?.id === list?.userId;

  const listItems = useMemo(() => {
    if (!list) return [];

    return list.items.map((item) => {
      switch (item.contentType) {
        case "movie":
          const movie = movies.find((m) => m.id === item.contentId);
          if (movie) {
            return {
              id: movie.id,
              title: movie.title,
              year: movie.year,
              poster: movie.poster,
              genres: movie.genres,
              averageRating: movie.averageRating,
              type: "movie" as const,
            };
          }
          break;
        case "tv":
          const show = tvShows.find((s) => s.id === item.contentId);
          if (show) {
            return {
              id: show.id,
              title: show.title,
              year: show.year,
              poster: show.poster,
              genres: show.genres,
              averageRating: show.averageRating,
              type: "tv" as const,
            };
          }
          break;
        case "book":
          const book = books.find((b) => b.id === item.contentId);
          if (book) {
            return {
              id: book.id,
              title: book.title,
              year: book.year,
              poster: book.cover,
              genres: book.genres,
              averageRating: book.averageRating,
              type: "book" as const,
            };
          }
          break;
      }
      return null;
    }).filter(Boolean);
  }, [list]);

  if (!list) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">List not found</h1>
        <p className="text-muted-foreground mb-8">
          This list doesn&apos;t exist or has been deleted.
        </p>
        <Button asChild>
          <Link href="/lists">Browse Lists</Link>
        </Button>
      </div>
    );
  }

  // Check if user can view this list
  if (!list.isPublic && !isOwner) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground mb-4">Private List</h1>
        <p className="text-muted-foreground mb-8">
          This list is private and can only be viewed by its creator.
        </p>
        <Button asChild>
          <Link href="/lists">Browse Lists</Link>
        </Button>
      </div>
    );
  }

  const handleDeleteList = () => {
    if (confirm("Are you sure you want to delete this list?")) {
      deleteList(list.id);
      window.location.href = "/lists";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/lists">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Lists
        </Link>
      </Button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold text-foreground">{list.name}</h1>
              {list.isPublic ? (
                <Globe className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            {list.description && (
              <p className="text-muted-foreground text-lg mb-4">{list.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Link
                href={`/profile/${list.username}`}
                className="flex items-center gap-1 hover:text-primary"
              >
                <User className="h-4 w-4" />
                @{list.username}
              </Link>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Created {new Date(list.createdAt).toLocaleDateString()}
              </span>
              <span>{list.items.length} items</span>
            </div>
          </div>

          {isOwner && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteList}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* List Items */}
      {listItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {listItems.map((item) => item && (
            <div key={`${item.type}-${item.id}`} className="relative group">
              <ContentCard
                id={item.id}
                title={item.title}
                year={item.year}
                poster={item.poster}
                genres={item.genres}
                averageRating={item.averageRating}
                type={item.type}
              />
              {isOwner && (
                <button
                  onClick={() => removeFromList(list.id, item.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  title="Remove from list"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">This list is empty.</p>
          {isOwner && (
            <p className="text-sm text-muted-foreground">
              Browse content and add items to your list from their detail pages.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
