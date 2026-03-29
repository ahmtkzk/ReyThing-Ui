"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { Calendar, Star, MessageSquare, List, Film, Tv, BookOpen, Settings, X, Quote } from "lucide-react";
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
import { movies } from "@/lib/data/movies";
import { tvShows } from "@/lib/data/tv-shows";
import { books } from "@/lib/data/books";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { username } = use(params);
  const { user, updateUser } = useAuth();
  const { ratings, comments, lists } = useUserData();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    displayName: user?.displayName || "",
    bio: user?.bio || "",
  });

  // Find the profile user
  const isOwnProfile = user?.username === username;

  // Get user stats
  const userRatings = ratings.filter((r) => isOwnProfile && r.userId === user?.id);
  const userComments = comments.filter((c) => c.username === username);
  const userLists = lists.filter((l) => l.username === username && (l.isPublic || isOwnProfile));

  // Get rated content
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

  // Profile display data
  const profileUser = isOwnProfile
    ? user
    : {
        username,
        displayName: username.charAt(0).toUpperCase() + username.slice(1),
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
        <p className="text-muted-foreground mb-8">
          The user @{username} does not exist.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Profile Header with gradient background */}
      <div className="relative">
        <div className="absolute inset-0 h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        
        <div className="container mx-auto px-4 pt-12 pb-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl">
                <AvatarImage src={profileUser.avatar} alt={profileUser.displayName} />
                <AvatarFallback className="text-4xl bg-primary text-primary-foreground">
                  {profileUser.displayName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left pb-2">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {profileUser.displayName}
                </h1>
                {isOwnProfile && (
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2" onClick={handleEditOpen}>
                        <Settings className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                          Update your profile information. Your username cannot be changed.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="username" className="text-muted-foreground">Username (cannot be changed)</Label>
                          <Input
                            id="username"
                            value={`@${user?.username}`}
                            disabled
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input
                            id="displayName"
                            value={editForm.displayName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, displayName: e.target.value }))}
                            placeholder="Your display name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">
                            Bio / Quote
                            <span className="text-muted-foreground ml-2 text-xs">
                              ({editForm.bio.length}/100 characters)
                            </span>
                          </Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value.slice(0, 100) }))}
                            placeholder="A short sentence about yourself or your favorite quote..."
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
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              <p className="text-lg text-muted-foreground mb-3">@{profileUser.username}</p>
              
              {profileUser.bio && (
                <div className="flex items-start gap-2 max-w-lg mx-auto md:mx-0 mb-4">
                  <Quote className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <p className="text-foreground/80 italic">{profileUser.bio}</p>
                </div>
              )}

              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(profileUser.joinedDate).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto md:mx-0">
            <div className="bg-card rounded-xl p-4 border border-border text-center shadow-sm">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                <Star className="h-5 w-5 text-yellow-500" />
                {userRatings.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Ratings</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center shadow-sm">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                <MessageSquare className="h-5 w-5 text-primary" />
                {userComments.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Comments</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center shadow-sm">
              <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground mb-1">
                <List className="h-5 w-5 text-accent" />
                {userLists.length}
              </div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Lists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="ratings" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="ratings" className="gap-2">
              <Star className="h-4 w-4" />
              Ratings
            </TabsTrigger>
            <TabsTrigger value="comments" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Comments
            </TabsTrigger>
            <TabsTrigger value="lists" className="gap-2">
              <List className="h-4 w-4" />
              Lists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ratings">
            {ratedContent.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
              <div className="text-center py-16 text-muted-foreground">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Star className="h-8 w-8 opacity-50" />
                </div>
                <p className="text-lg mb-2">{isOwnProfile ? "You haven't rated anything yet." : "No ratings yet."}</p>
                <p className="text-sm mb-4">Start exploring and rate your favorite content!</p>
                {isOwnProfile && (
                  <Button asChild>
                    <Link href="/movies">Start Rating</Link>
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="comments">
            {userComments.length > 0 ? (
              <div className="space-y-4">
                {userComments.map((comment) => {
                  let contentTitle = "";
                  let contentHref = "";
                  let ContentIcon = Film;

                  if (comment.contentType === "movie") {
                    const movie = movies.find((m) => m.id === comment.contentId);
                    contentTitle = movie?.title || "Unknown Movie";
                    contentHref = `/movies/${comment.contentId}`;
                    ContentIcon = Film;
                  } else if (comment.contentType === "tv") {
                    const show = tvShows.find((s) => s.id === comment.contentId);
                    contentTitle = show?.title || "Unknown Show";
                    contentHref = `/tv-shows/${comment.contentId}`;
                    ContentIcon = Tv;
                  } else {
                    const book = books.find((b) => b.id === comment.contentId);
                    contentTitle = book?.title || "Unknown Book";
                    contentHref = `/books/${comment.contentId}`;
                    ContentIcon = BookOpen;
                  }

                  return (
                    <div
                      key={comment.id}
                      className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <ContentIcon className="h-4 w-4 text-primary" />
                        <Link
                          href={contentHref}
                          className="font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {contentTitle}
                        </Link>
                        <span className="text-muted-foreground/50">|</span>
                        <span>{new Date(comment.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-foreground leading-relaxed">{comment.text}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <MessageSquare className="h-8 w-8 opacity-50" />
                </div>
                <p className="text-lg mb-2">{isOwnProfile ? "You haven't commented on anything yet." : "No comments yet."}</p>
                <p className="text-sm">Share your thoughts on movies, shows, and books!</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lists">
            {userLists.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userLists.map((list) => (
                  <Link
                    key={list.id}
                    href={`/lists/${list.id}`}
                    className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {list.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {list.description || "No description"}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="bg-muted px-2 py-1 rounded-md">{list.items.length} items</span>
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
              <div className="text-center py-16 text-muted-foreground">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <List className="h-8 w-8 opacity-50" />
                </div>
                <p className="text-lg mb-2">{isOwnProfile ? "You haven't created any lists yet." : "No public lists."}</p>
                <p className="text-sm mb-4">Create curated collections of your favorites!</p>
                {isOwnProfile && (
                  <Button asChild>
                    <Link href="/lists">Create a List</Link>
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
