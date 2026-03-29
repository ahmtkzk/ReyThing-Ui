"use client";

import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Globe, Lock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentCard } from "@/components/content/content-card";
import { useAuth } from "@/lib/context/auth-context";
import { useUserData } from "@/lib/context/user-data-context";
import { useLanguage } from "@/lib/context/language-context";
import { movies } from "@/lib/data/movies";
import { tvShows } from "@/lib/data/tv-shows";
import { books } from "@/lib/data/books";

export default function ListDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getListById, removeFromList, deleteList } = useUserData();
  const { t } = useLanguage();

  const list = id ? getListById(id) : null;

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
        <h1 className="text-2xl font-bold text-foreground mb-4">{t("lists.noPublicLists")}</h1>
        <Button asChild>
          <Link to="/lists">{t("nav.lists")}</Link>
        </Button>
      </div>
    );
  }

  if (!list.isPublic && !isOwner) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground mb-4">{t("lists.publicList")}</h1>
        <Button asChild>
          <Link to="/lists">{t("nav.lists")}</Link>
        </Button>
      </div>
    );
  }

  const handleDeleteList = () => {
    if (confirm("Are you sure you want to delete this list?")) {
      deleteList(list.id);
      navigate("/lists");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <Button variant="ghost" size="sm" asChild className="mb-4 md:mb-6">
        <Link to="/lists">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t("nav.lists")}
        </Link>
      </Button>

      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{list.name}</h1>
              {list.isPublic ? (
                <Globe className="h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
              ) : (
                <Lock className="h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
              )}
            </div>
            {list.description && (
              <p className="text-sm md:text-base text-muted-foreground mb-4">{list.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-muted-foreground">
              <Link
                to={`/profile/${list.username}`}
                className="flex items-center gap-1 hover:text-primary"
              >
                <User className="h-3 md:h-4 w-3 md:w-4" />
                @{list.username}
              </Link>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 md:h-4 w-3 md:w-4" />
                {new Date(list.createdAt).toLocaleDateString()}
              </span>
              <span>{t("lists.items").replace("{count}", list.items.length.toString())}</span>
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
              {t("movies.clear")}
            </Button>
          )}
        </div>
      </div>

      {listItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
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
        <div className="text-center py-12 md:py-16">
          <p className="text-sm md:text-base text-muted-foreground mb-4">{t("lists.noPublicLists")}</p>
        </div>
      )}
    </div>
  );
}
