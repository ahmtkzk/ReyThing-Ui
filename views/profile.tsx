"use client";

import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Star, MessageSquare, List, Film, Tv, BookOpen, Settings, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContentCard } from "@/components/content/content-card";
import { useAuth } from "@/lib/context/auth-context";
import { useUserData } from "@/lib/context/user-data-context";
import { useLanguage } from "@/lib/context/language-context";
import { movies } from "@/lib/data/movies";
import { tvShows } from "@/lib/data/tv-shows";
import { books } from "@/lib/data/books";

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user, updateUser } = useAuth();
  const { ratings, comments, lists } = useUserData();
  const { t } = useLanguage();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || "",
    bio: user?.bio || "",
  });

  const isOwnProfile = user?.username === username;

  const userRatings = ratings.filter((r) => isOwnProfile && r.userId === user?.id);
  const userComments = comments.filter((c) => c.username === username);
  const userLists = lists.filter((l) => l.username === username && (l.isPublic || isOwnProfile));

  const ratedContent = useMemo(() => {
    if (!isOwnProfile) return [];
    
    return userRatings.map((rating) => {
      let content;
      switch (rating.contentType) {
        case "movie":
          content = movies.find((m) => m.id === rating.contentId);
          if (content) {
            return {
              ...content,
              type: "movie" as const,
              poster: content.poster,
              userRating: rating.score,
            };
          }
          break;
        case "tv":
          content = tvShows.find((s) => s.id === rating.contentId);
          if (content) {
            return {
              ...content,
              type: "tv" as const,
              poster: content.poster,
              userRating: rating.score,
            };
          }
          break;
        case "book":
          content = books.find((b) => b.id === rating.contentId);
          if (content) {
            return {
              ...content,
              type: "book" as const,
              poster: content.cover,
              userRating: rating.score,
            };
          }
          break;
      }
      return null;
    }).filter(Boolean);
  }, [userRatings, isOwnProfile]);

  const profileUser = isOwnProfile
    ? user
    : {
        username,
        displayName: username?.charAt(0).toUpperCase() + (username?.slice(1) || ""),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
        bio: "",
        joinedDate: "2024-01-01",
      };

  const handleEditOpen = () => {
    setEditForm({
      displayName: user?.displayName || "",
      bio: user?.bio || "",
    });
    setIsEditOpen(true);
  };

  const handleSaveProfile = () => {
    if (editForm.displayName.trim()) {
      updateUser({
        displayName: editForm.displayName.trim(),
        bio: editForm.bio.slice(0, 100),
      });
      setIsEditOpen(false);
    }
  };

  if (!profileUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">User not found</h1>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="absolute inset-0 h-32 md:h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        
        <div className="container mx-auto px-4 pt-8 md:pt-12 pb-6 md:pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 border-4 border-background shadow-xl">
                <AvatarImage src={profileUser.avatar} alt={profileUser.displayName} />
                <AvatarFallback className="text-2xl md:text-4xl bg-primary text-primary-foreground">
                  {profileUser.displayName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 text-center md:text-left pb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                  {profileUser.displayName}
                </h1>
                {isOwnProfile && (
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2 mx-auto md:mx-0" onClick={handleEditOpen}>
                        <Settings className="h-4 w-4" />
                        {t("profile.editProfile")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{t("profile.editProfile")}</DialogTitle>
                        <DialogDescription>
                          Update your profile information.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-muted-foreground">{t("signup.username")}</Label>
                          <Input
                            id="username"
                            value={`@${user?.username}`}
                            disabled
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="displayName">{t("signup.displayName")}</Label>
                          <Input
                            id="displayName"
                            value={editForm.displayName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">
                            Bio
                            <span className="text-muted-foreground ml-2 text-xs">
                              ({editForm.bio.length}/100)
                            </span>
                          </Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value.slice(0, 100) }))}
                            className="resize-none"
                            rows={3}
                            maxLength={100}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile} disabled={!editForm.displayName.trim()}>
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              <p className="text-base md:text-lg text-muted-foreground mb-2 md:mb-3">@{profileUser.username}</p>
              
              {profileUser.bio && (
                <div className="flex items-start gap-2 max-w-lg mx-auto md:mx-0 mb-3 md:mb-4">
                  <Quote className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <p className="text-sm md:text-base text-foreground/80 italic">{profileUser.bio}</p>
                </div>
              )}

              <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-muted-foreground">
                <Calendar className="h-3 md:h-4 w-3 md:w-4" />
                <span>{t("profile.joined")} {new Date(profileUser.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8 max-w-sm mx-auto md:mx-0">
            <div className="bg-card rounded-lg md:rounded-xl p-3 md:p-4 border border-border text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 md:gap-2 text-xl md:text-2xl font-bold text-foreground mb-1">
                <Star className="h-4 md:h-5 w-4 md:w-5 text-yellow-500" />
                {userRatings.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("profile.ratings")}</p>
            </div>
            <div className="bg-card rounded-lg md:rounded-xl p-3 md:p-4 border border-border text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 md:gap-2 text-xl md:text-2xl font-bold text-foreground mb-1">
                <MessageSquare className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                {userComments.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("profile.reviews")}</p>
            </div>
            <div className="bg-card rounded-lg md:rounded-xl p-3 md:p-4 border border-border text-center shadow-sm">
              <div className="flex items-center justify-center gap-1 md:gap-2 text-xl md:text-2xl font-bold text-foreground mb-1">
                <List className="h-4 md:h-5 w-4 md:w-5 text-accent" />
                {userLists.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{t("profile.lists")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <Tabs defaultValue="ratings" className="space-y-4 md:space-y-6">
          <TabsList className="bg-muted/50 flex-wrap h-auto p-1">
            <TabsTrigger value="ratings" className="gap-1.5 text-xs sm:text-sm">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {t("profile.ratings")}
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-1.5 text-xs sm:text-sm">
              <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {t("profile.reviews")}
            </TabsTrigger>
            <TabsTrigger value="lists" className="gap-1.5 text-xs sm:text-sm">
              <List className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {t("profile.lists")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ratings">
            {ratedContent.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {ratedContent.map((item) => item && (
                  <ContentCard
                    key={`${item.type}-${item.id}`}
                    id={item.id}
                    title={item.title}
                    year={item.year}
                    poster={item.poster}
                    genres={item.genres}
                    averageRating={item.averageRating}
                    type={item.type}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16 text-muted-foreground">
                <Star className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm md:text-base">{t("profile.ratings")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments">
            {userComments.length > 0 ? (
              <div className="space-y-3 md:space-y-4">
                {userComments.map((comment) => {
                  let contentTitle = "";
                  let contentHref = "";
                  let ContentIcon = Film;

                  if (comment.contentType === "movie") {
                    const movie = movies.find((m) => m.id === comment.contentId);
                    contentTitle = movie?.title || "";
                    contentHref = `/movies/${comment.contentId}`;
                    ContentIcon = Film;
                  } else if (comment.contentType === "tv") {
                    const show = tvShows.find((s) => s.id === comment.contentId);
                    contentTitle = show?.title || "";
                    contentHref = `/tv-shows/${comment.contentId}`;
                    ContentIcon = Tv;
                  } else {
                    const book = books.find((b) => b.id === comment.contentId);
                    contentTitle = book?.title || "";
                    contentHref = `/books/${comment.contentId}`;
                    ContentIcon = BookOpen;
                  }

                  return (
                    <div
                      key={comment.id}
                      className="rounded-lg md:rounded-xl border border-border bg-card p-4 md:p-5 transition-colors hover:border-primary/30"
                    >
                      <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                        <ContentIcon className="h-3 md:h-4 w-3 md:w-4 text-primary" />
                        <Link
                          to={contentHref}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {contentTitle}
                        </Link>
                        <span className="text-muted-foreground/50">|</span>
                        <span>{new Date(comment.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm md:text-base text-foreground leading-relaxed">{comment.text}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16 text-muted-foreground">
                <MessageSquare className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm md:text-base">{t("profile.reviews")}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lists">
            {userLists.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {userLists.map((list) => (
                  <Link
                    key={list.id}
                    to={`/lists/${list.id}`}
                    className="group rounded-lg md:rounded-xl border border-border bg-card p-4 md:p-5 hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {list.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4">
                      {list.description || t("lists.noDescription")}
                    </p>
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded-md">{t("lists.items").replace("{count}", list.items.length.toString())}</span>
                      {!list.isPublic && (
                        <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                          Private
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 md:py-16 text-muted-foreground">
                <List className="h-10 md:h-12 w-10 md:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm md:text-base">{t("profile.lists")}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
